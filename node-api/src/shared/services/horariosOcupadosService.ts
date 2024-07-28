import { Request, Response } from "express";
import HorariosOcupados from "../../models/horariosOcupados";

class HorariosOcupadosService {
  getHorariosOcupadosbyDateAndQuadraId = async (req: Request, res: Response) => {
    try {
      const { data, idQuadra } = req.params;
      const ocupados = await HorariosOcupados.findAll({
        where: {
          idQuadra,
          data
        },
        attributes: ["horario"],
      });
      const horariosReservados = ocupados.map((ocupados) => ocupados.horario);
      res.status(200).json(horariosReservados);
    } catch (error) {
      console.error("Error getting horarios:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  getHorariosOcupadosbyUserId = async (req: Request, res: Response) => {
    try {
      const { idUsuario } = req.params;
      const ocupados = await HorariosOcupados.findAll({
        where: {
          idUsuario,
        },
        attributes: ["horario"],
      });
      const horariosReservados = ocupados.map((ocupados) => ocupados.horario);
      return horariosReservados;
    } catch (error) {
      console.error("Error getting horarios:", error);
      return [];
    }
  }
}; 

export default new HorariosOcupadosService();
