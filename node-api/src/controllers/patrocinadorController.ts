import { Request, Response } from "express";
import Patrocinador from "../models/patrocinador";

export const createPatrocinador = async (req: Request, res: Response) => {
    try {
        const { nome, descricao, imagem } = req.body;
        const newPatrocinador = await Patrocinador.create({ nome, descricao, imagem });
        res.status(201).json(newPatrocinador);
    } catch (error) {
        console.error("Error creating patrocinador:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deletePatrocinador = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
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

export const updatePatrocinador = async (req: Request, res: Response) => {
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

export const getPatrocinadores = async (req: Request, res: Response) => {
    try {
        const patrocinadores = await Patrocinador.findAll();
        res.status(200).json(patrocinadores);
    } catch (error) {
        console.error("Error fetching patrocinadores:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getPatrocinadorById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
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