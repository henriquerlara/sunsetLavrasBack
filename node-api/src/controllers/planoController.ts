import { Request, Response } from 'express'
import Plano from '../models/plano'
import * as yup from 'yup'

interface PlanoAttributes {
  nome: string
  descricao: string
  preco: number
}

const bodyValidation: yup.ObjectSchema<PlanoAttributes> = yup.object().shape({
  nome: yup.string().required(),
  descricao: yup.string().required(),
  preco: yup.number().required()
})

class PlanoController {
  createPlano = async (req: Request, res: Response) => {
    let isValidBody: PlanoAttributes | undefined = undefined;
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
    let isValidBody: PlanoAttributes | undefined = undefined;
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
      if (!id || isNaN(Number(id))) {
        res.status(400).json({ error: 'ID is required or is not valid' });
        return;
      }
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