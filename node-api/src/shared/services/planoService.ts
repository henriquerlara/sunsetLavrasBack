import { Request, Response } from "express";
import Plano from "../../models/plano";

class PlanoService {
  getPlanosByUserId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id || isNaN(Number(id))) {
        res.status(400).json({ error: 'ID is required or is not valid' });
        return;
      }
      const planos = await Plano.findAll({
        where: {
          idUsuario: id
        }
      });
      res.status(200).json(planos);
    } catch (error) {
      console.error("Error getting planos:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default new PlanoService();