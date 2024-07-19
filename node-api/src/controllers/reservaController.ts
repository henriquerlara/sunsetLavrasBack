import e, {Request, Response} from 'express';
import Reserva from '../models/reserva';
import Quadra from '../models/quadra';
import Usuario from '../models/usuario';

class ReservaController {
    createReserva = async (req: Request, res: Response) => {
        try {
            const { idQuadra, dataHoraInicio, dataHoraFim } = req.body;
            if (!req.session || !req.session.usuario) {
                return res.status(400).json({ error: 'Usuário não autenticado' });
            }
            let idUsuario = req.session.usuario.cpf;
            const newReserva = await Reserva.create({ idQuadra, idUsuario, dataHoraInicio, dataHoraFim });
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
            const { data, cpfUsuario, idQuadra } = req.body;
            const reserva = await Reserva.findByPk(id);

            if (!reserva) {
                res.status(404).json({ error: 'Reserva not found' });
                return;
            }

            reserva.data = data;
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