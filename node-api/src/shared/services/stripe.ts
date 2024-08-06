import { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import HorariosOcupados from '../../models/horariosOcupados';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { date, entries, userId } = req.body;

  if (!entries || !Array.isArray(entries) || !userId) {
    return res.status(400).json({ error: 'Required parameters are missing or incorrect' });
  }

  try {
    // Verificar disponibilidade de horários para cada entrada
    for (const entry of entries) {
      const { court, hour } = entry;

      const existingReservation = await HorariosOcupados.findOne({
        where: {
          data: date,
          horario: hour,
          idQuadra: court,
        },
      });

      if (existingReservation) {
        return res.status(400).json({ error: `Horário ${hour} no dia ${date} para a quadra ${court} já está reservado.` });
      }
    }

    // Criar itens de linha para todas as combinações de quadras e horários
    const lineItems = entries.map(({ court, hour }) => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: `Quadra ${court} no dia ${date} às ${hour}`,
        },
        unit_amount: 8000, // Aqui poderia ser ajustado para considerar descontos
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      metadata: {
        date: date || '',
        entries: JSON.stringify(entries) || '',
        userId: userId.toString(),
      },
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error: any) {
    console.error('Error creating Stripe session:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    const rawBody = (req as any).rawBody;
    console.log('Raw body in webhook handler:', rawBody);
    console.log('Signature in webhook handler:', sig);

    event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
  } catch (err: any) {
    console.error('Error verifying webhook signature:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    console.log('Metadata in session:', metadata);

    if (!metadata) {
      console.error('No metadata found in session');
      return res.status(400).send('No metadata found in session');
    }

    const { date, entries, userId } = metadata;

    if (!date) {
      console.error('Date is missing in metadata');
      return res.status(400).send('Date is missing in metadata');
    }
    if (!entries) {
      console.error('Entries are missing in metadata');
      return res.status(400).send('Entries are missing in metadata');
    }
    if (!userId) {
      console.error('UserId is missing in metadata');
      return res.status(400).send('UserId is missing in metadata');
    }

    console.log('date:', date);
    console.log('entries:', entries);
    console.log('userId:', userId);

    try {
      const entriesArray = JSON.parse(entries);
      for (const { court, hour } of entriesArray) {
        const existingReservation = await HorariosOcupados.findOne({
          where: {
            data: date,
            horario: hour,
            idQuadra: parseInt(court, 10),
          },
        });

        if (existingReservation) {
          console.error(`Horário já reservado: ${hour} na data: ${date} para a quadra: ${court}`);
          throw new Error(`Horário já reservado: ${hour} na data: ${date} para a quadra: ${court}`);
        }

        await HorariosOcupados.create({
          data: date,
          horario: hour,
          idQuadra: parseInt(court, 10),
          idUsuario: parseInt(userId, 10),
        });
      }
      console.log('Reservation confirmed for session:', session.id);
    } catch (error: any) {
      console.error('Error confirming reservation:', error.message);
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }
  }

  res.status(200).json({ received: true });
};

