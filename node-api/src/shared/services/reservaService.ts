import { Request, Response } from "express";
import Reserva from "../../models/reserva";
import { Op } from "sequelize";

class reservaService {
  getHorariosReservados = async (req: Request, res: Response) => {
    try {
      const { data, idQuadra } = req.params;
      const reservas = await Reserva.findAll({
        where: {
          idQuadra,
          dataInicio: {
            [Op.between]: [
              new Date(`${data}T00:00:00.000-03:00`),
              new Date(`${data}T23:59:59.999-03:00`),
            ],
          },
        },
        attributes: ["dataInicio"],
      });
      const horariosReservados = reservas.map((reserva) => reserva.dataInicio);
      res.status(200).json(horariosReservados);
    } catch (error) {
      console.error("Error getting reservas:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
