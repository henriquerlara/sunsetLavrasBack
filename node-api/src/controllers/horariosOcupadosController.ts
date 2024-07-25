import { Request, Response } from "express";
import HorariosOcupados from "../models/horariosOcupados";
import * as yup from "yup";

// Definir a interface para validação
interface HorarioOcupadoAttributes {
    data: string; // Usar string para representar a data no formato YYYY-MM-DD
    horario: string; // Formato HH:mm
    idQuadra: number;
}

const bodyValidation: yup.ObjectSchema<HorarioOcupadoAttributes> = yup.object().shape({
    data: yup.string()
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Data deve estar no formato YYYY-MM-DD')
        .required(),
    horario: yup.string().length(5).required(), // Formato HH:mm
    idQuadra: yup.number().required()
});

class HorarioOcupadoController {
    createHorarioOcupado = async (req: Request, res: Response) => {
        let isValidBody: HorarioOcupadoAttributes | undefined = undefined;
        try {
            isValidBody = await bodyValidation.validate(req.body, { abortEarly: false });
        } catch (err) {
            const yupError = err as yup.ValidationError;
            const ValidationErrors: Record<string, string> = {};

            yupError.inner.forEach(error => {
                if (error.path === undefined) return;
                ValidationErrors[error.path] = error.message;
            });

            return res.status(400).json({ errors: ValidationErrors });
        }

        try {
            const { data, horario, idQuadra } = isValidBody;
            const newHorarioOcupado = await HorariosOcupados.create({ data, horario, idQuadra });
            res.status(201).json(newHorarioOcupado);
          } catch (error) {
            console.error('Error creating horario ocupado:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    };

    deleteHorarioOcupado = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                res.status(400).json({ error: 'ID is required or is not valid' });
                return;
            }
            const horarioOcupado = await HorariosOcupados.findByPk(id);

            if (!horarioOcupado) {
                res.status(404).json({ error: 'Horario ocupado not found' });
                return;
            }

            await horarioOcupado.destroy();
            res.status(204).end();
        } catch (error) {
            console.error('Error deleting horario ocupado:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    getHorariosOcupados = async (req: Request, res: Response) => {
        try {
            const horariosOcupados = await HorariosOcupados.findAll();
            res.status(200).json(horariosOcupados);
        } catch (error) {
            console.error('Error getting horarios ocupados:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    getHorarioOcupado = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                res.status(400).json({ error: 'ID is required or is not valid' });
                return;
            }
            const horarioOcupado = await HorariosOcupados.findByPk(id);

            if (!horarioOcupado) {
                res.status(404).json({ error: 'Horario ocupado not found' });
                return;
            }

            res.status(200).json(horarioOcupado);
        } catch (error) {
            console.error('Error getting horario ocupado:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    updateHorarioOcupado = async (req: Request, res: Response) => {
        let isValidBody: HorarioOcupadoAttributes | undefined = undefined;
        try {
            isValidBody = await bodyValidation.validate(req.body, { abortEarly: false });
        } catch (err) {
            const yupError = err as yup.ValidationError;
            const ValidationErrors: Record<string, string> = {};

            yupError.inner.forEach(error => {
                if (error.path === undefined) return;
                ValidationErrors[error.path] = error.message;
            });

            return res.status(400).json({ errors: ValidationErrors });
        }

        try {
            const { id } = req.params;
            const { data, horario, idQuadra } = isValidBody;
            const horarioOcupado = await HorariosOcupados.findByPk(id);

            if (!horarioOcupado) {
                res.status(404).json({ error: 'Horario ocupado not found' });
                return;
            }

            horarioOcupado.data = data;
            horarioOcupado.horario = horario;
            horarioOcupado.idQuadra = idQuadra;
            await horarioOcupado.save();

            res.status(200).json(horarioOcupado);
        } catch (error) {
            console.error('Error updating horario ocupado:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}

export default new HorarioOcupadoController();