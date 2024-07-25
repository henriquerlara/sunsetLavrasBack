import { Request, Response } from 'express';
import Quadra from '../models/quadra';
import Patrocinador from '../models/patrocinador';
import * as yup from 'yup';

interface QuadraAttributes {
    nome: string;
    idPatrocinador: number;
}

const bodyValidation: yup.ObjectSchema<QuadraAttributes> = yup.object().shape({
    nome: yup.string().required(),
    idPatrocinador: yup.number().required()
});

class QuadraController {
    createQuadra = async (req: Request, res: Response) => {
        let isValidBody: QuadraAttributes | undefined = undefined;
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
            const { nome, idPatrocinador } = req.body;
            const newQuadra = await Quadra.create({ nome, idPatrocinador });
            res.status(201).json(newQuadra);
        } catch (error) {
            console.error('Error creating quadra:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    getQuadras = async (req: Request, res: Response) => {
        try {
            const quadras = await Quadra.findAll({
                include: [{
                    model: Patrocinador,
                    as: 'patrocinador'
                }]
            });
            res.status(200).json(quadras);
        } catch (error) {
            console.error('Error getting quadras:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    updateQuadra = async (req: Request, res: Response) => {
        let isValidBody: QuadraAttributes | undefined = undefined;
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
            if (!id || isNaN(Number(id))) {
                res.status(400).json({ error: 'ID is required or is not valid' });
                return;
            }
            const { nome, idPatrocinador } = req.body;
            const quadra = await Quadra.findByPk(id);

            if (!quadra) {
                res.status(404).json({ error: 'Quadra not found' });
                return;
            }

            quadra.nome = nome;
            quadra.idPatrocinador = idPatrocinador;
            await quadra.save();

            res.status(200).json(quadra);
        } catch (error) {
            console.error('Error updating quadra:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    deleteQuadra = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                res.status(400).json({ error: 'ID is required or is not valid' });
                return;
            }
            const quadra = await Quadra.findByPk(id);

            if (!quadra) {
                res.status(404).json({ error: 'Quadra not found' });
                return;
            }

            await quadra.destroy();
            res.status(204).end();
        } catch (error) {
            console.error('Error deleting quadra:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}

export default new QuadraController();
