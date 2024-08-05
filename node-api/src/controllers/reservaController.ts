import e, { Request, Response } from 'express';
import Reserva from '../models/reserva';
import Quadra from '../models/quadra';
import Usuario from '../models/usuario';
import Plano from '../models/plano';
import * as yup from 'yup';
import { bodyValidator } from '../shared/middleware/validations'
import horariosOcupadosService from '../shared/services/horariosOcupadosService';

interface ReservaAttributes {
    dias: string[][]; // armazena guarda o horario para cada dia da semana
    idPlano: number;
    idUsuario: string;
    idQuadra: number;
  }
  
  export const reservaValidation = bodyValidator((getSchema) => ({
    body: getSchema<ReservaAttributes>(yup.object().shape({
        dias: yup.array()
        .of(
            yup.array().of(
                yup.string()
                    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Horário deve estar no formato HH:mm')
                    .length(5, 'Horário deve ter exatamente 5 caracteres')
                    .required()
            )
        )
        .length(7, 'dias deve conter exatamente 7 elementos')
        .required('dias é obrigatório') as yup.Schema<string[][]>,
    idPlano: yup.number().required('idPlano é obrigatório'),
    idUsuario: yup.string().required('idUsuario é obrigatório'),
    idQuadra: yup.number().required('idQuadra é obrigatório')
    }))
  }));


class ReservaController {
    createReserva = async (req: Request, res: Response) => {
        try {
            const { dias, idPlano, idUsuario, idQuadra } = req.body;
            const newReserva = await Reserva.create({ dias, idPlano, idUsuario, idQuadra });
            horariosOcupadosService.createHorariosOcupadosByReserva(dias, idPlano, idQuadra, idUsuario);

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
            const { dias, idPlano, idUsuario, idQuadra } = req.body;
            const reserva = await Reserva.findByPk(id);

            if (!reserva) {
                res.status(404).json({ error: 'Reserva not found' });
                return;
            }

            reserva.dias = dias
            reserva.idPlano = idPlano;
            reserva.idUsuario = idUsuario;
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
            if (!id || isNaN(Number(id))) {
                res.status(400).json({ error: 'ID is required or is not valid' });
                return;
            }
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
    getReservaById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                res.status(400).json({ error: 'ID is required or is not valid' });
                return;
            }
            const reserva = await Reserva.findByPk(id);

            if (!reserva) {
                res.status(404).json({ error: 'Reserva not found' });
                return;
            }

            res.status(200).json(reserva);
        } catch (error) {
            console.error('Error getting reserva:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}

export default new ReservaController();