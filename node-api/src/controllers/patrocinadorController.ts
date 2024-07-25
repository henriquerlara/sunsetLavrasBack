import { Request, Response } from "express";
import Patrocinador from "../models/patrocinador";
import * as yup from "yup";

interface PatrocinadorAttributes {
    nome: string;
    descricao: string;
    imagem: string;
}

const bodyValidation: yup.ObjectSchema<PatrocinadorAttributes> = yup.object().shape({
    nome: yup.string().required(),
    descricao: yup.string().required(),
    imagem: yup.string().required()
});

class PatrocinadorController {
    createPatrocinador = async (req: Request, res: Response) => {
        let isValidBody: PatrocinadorAttributes | undefined = undefined;
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
            const { nome, descricao, imagem } = req.body;
            const newPatrocinador = await Patrocinador.create({ nome, descricao, imagem });
            res.status(201).json(newPatrocinador);
        } catch (error) {
            console.error("Error creating patrocinador:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    deletePatrocinador = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                res.status(400).json({ error: 'ID is required or is not valid' });
                return;
            }
            const patrocinador = await Patrocinador.findByPk(id);

            if (!patrocinador) {
                res.status(404).json({ error: "Patrocinador not found" });
                return;
            }

            await patrocinador.destroy();
            res.status(204).end();
        } catch (error) {
            console.error("Error deleting patrocinador:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    updatePatrocinador = async (req: Request, res: Response) => {
        let isValidBody: PatrocinadorAttributes | undefined = undefined;
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
            const { nome, descricao, imagem } = req.body;
            const patrocinador = await Patrocinador.findByPk(id);

            if (!patrocinador) {
                res.status(404).json({ error: "Patrocinador not found" });
                return;
            }

            patrocinador.nome = nome;
            patrocinador.descricao = descricao;
            patrocinador.imagem = imagem;
            await patrocinador.save();

            res.status(200).json(patrocinador);
        } catch (error) {
            console.error("Error updating patrocinador:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    getPatrocinadores = async (req: Request, res: Response) => {
        try {
            const patrocinadores = await Patrocinador.findAll();
            res.status(200).json(patrocinadores);
        } catch (error) {
            console.error("Error fetching patrocinadores:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    getPatrocinadorById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                res.status(400).json({ error: 'ID is required or is not valid' });
                return;
            }
            const patrocinador = await Patrocinador.findByPk(id);

            if (!patrocinador) {
                res.status(404).json({ error: "Patrocinador not found" });
                return;
            }

            res.status(200).json(patrocinador);
        } catch (error) {
            console.error("Error fetching patrocinador:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}

export default new PatrocinadorController();