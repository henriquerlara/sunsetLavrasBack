import e, {Request, Response} from 'express';
import Reserva from '../models/reserva';
import Quadra from '../models/quadra';
import Usuario from '../models/usuario';
import Plano from '../models/plano';
import * as yup from 'yup';

interface ReservaAttributes {
    dataInicio: Date;
    dataFim: Date;
    idPlano: number;
    cpfUsuario: string;
    idQuadra: number;
}

class ReservaController {
    createReserva = async (req: Request, res: Response) => {
        try {
            const { dataInicio, dataFim, idPlano, cpfUsuario, idQuadra } = req.body;
            const newReserva = await Reserva.create({ dataInicio, dataFim, idPlano, cpfUsuario, idQuadra });
            res.status(201).json(newReserva);
        } catch (error) {
            console.error('Error creating reserva:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
    getReservas = async (req: Request, res: Response) => {
        try {
            const reservas = await Reserva.findAll({
                include: [{
                    model: Quadra,
                    as: 'quadra'
                }, {
                    model: Usuario,
                    as: 'usuario'
                    }, {
                    model: Plano,
                    as: 'plano'
                }]
            });
            res.status(200).json(reservas);
        } catch (error) {
            console.error('Error getting reservas:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
    updateReserva = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { dataInicio, dataFim, idPlano, cpfUsuario, idQuadra } = req.body;
            const reserva = await Reserva.findByPk(id);

            if (!reserva) {
                res.status(404).json({ error: 'Reserva not found' });
                return;
            }

            reserva.dataInicio = dataInicio;
            reserva.dataFim = dataFim;
            reserva.idPlano = idPlano;
            reserva.cpfUsuario = cpfUsuario;
            reserva.idQuadra = idQuadra;
            await reserva.save();

            res.status(200).json(reserva);
        } catch (error) {
            console.error('Error updating reserva:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
    deleteReserva = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const reserva = await Reserva.findByPk(id);

            if (!reserva) {
                res.status(404).json({ error: 'Reserva not found' });
                return;
            }

            await reserva.destroy();
            res.status(204).end();
        } catch (error) {
            console.error('Error deleting reserva:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}

export default new ReservaController();