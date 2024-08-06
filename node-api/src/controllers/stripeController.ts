import { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { date, hours, court } = req.body;

  console.log('Request body:', req.body); // Log do corpo da requisição

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: hours.map((hour: string) => ({
        price_data: {
          currency: 'brl', // Alterar para BRL
          product_data: {
            name: `Quadra ${court} no dia ${date} às ${hour}`,
          },
          unit_amount: 8000, // Valor em centavos (R$ 80.00)
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    console.log('Stripe session created:', session); // Log da sessão criada

    res.json({ id: session.id });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating Stripe session:', error.message); // Log do erro
      res.status(500).json({ error: error.message });
    } else {
      console.error('Unknown error occurred:', error); // Log do erro desconhecido
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};
