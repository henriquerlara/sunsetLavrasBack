import { Request, Response } from "express";
import Reserva from "../../models/reserva";
import { Op } from "sequelize";

class reservaService {
  // getHorariosReservados = async (req: Request, res: Response) => {
  //   try {
  //     const { idQuadra, data } = req.params;
  //     const ocupados = await Reserva.findAll({
  //       where: {
  //         idQuadra,
  //         data
  //       },
  //       attributes: ["horario"],
  //     });
  //     const horariosReservados = ocupados.map((ocupados) => ocupados.horario);
  //     res.status(200).json(horariosReservados);
  //   } catch (error) {
  //     console.error("Error getting horarios:", error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // };
}
