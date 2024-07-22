import { Request, Response } from 'express'
import Plano from '../models/plano'

class PlanoController {
  createPlano = async (req: Request, res: Response) => {
    try {
      const { nome, descricao, preco } = req.body;
      const newPlano = await Plano.create({ nome, descricao, preco });
      res.status(201).json(newPlano);
    } catch (error) {
      console.error("Error creating plano:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  getPlanos = async (req: Request, res: Response) => {
    try {
      const planos = await Plano.findAll();
      res.status(200).json(planos);
    } catch (error) {
      console.error("Error getting plano:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  updatePlano = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { nome, descricao, preco } = req.body;
      const plano = await Plano.findByPk(id);

      if (!plano) {
        res.status(404).json({ error: "Plano not found" });
        return;
      }

      plano.nome = nome;
      plano.descricao = descricao;
      plano.preco = preco;

      res.status(200).json(plano);
    } catch (error) {
      console.error("Error updating plano:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  deletePlano = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const plano = await Plano.findByPk(id);

      if (!plano) {
        res.status(404).json({ error: "Plano not found" });
        return;
      }

      await plano.destroy();
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting plano:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default new PlanoController();