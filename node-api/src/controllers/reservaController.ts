import e, { Request, Response } from "express";
import { Op } from "sequelize";
import Reserva from "../models/reserva";
import Quadra from "../models/quadra";
import Usuario from "../models/usuario";
import Plano from "../models/plano";

class ReservaController {
  createReserva = async (req: Request, res: Response) => {
    try {
      const { dataInicio, dataFim, idPlano, cpfUsuario, idQuadra } = req.body;
      const newReserva = await Reserva.create({
        dataInicio,
        dataFim,
        idPlano,
        cpfUsuario,
        idQuadra,
      });
      res.status(201).json(newReserva);
    } catch (error) {
      console.error("Error creating reserva:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  getReservas = async (req: Request, res: Response) => {
    try {
      const reservas = await Reserva.findAll({
        include: [
          {
            model: Quadra,
            as: "quadra",
          },
          {
            model: Usuario,
            as: "usuario",
          },
          {
            model: Plano,
            as: "plano",
          },
        ],
      });
      res.status(200).json(reservas);
    } catch (error) {
      console.error("Error getting reservas:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  updateReserva = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { dataInicio, dataFim, idPlano, cpfUsuario, idQuadra } = req.body;
      const reserva = await Reserva.findByPk(id);

      if (!reserva) {
        res.status(404).json({ error: "Reserva not found" });
        return;
      }

      reserva.dataInicio = dataInicio;
      reserva.dataFim = dataFim;
      reserva.idPlano = idPlano;
      reserva.cpfUsuario = cpfUsuario;
      reserva.idQuadra = idQuadra;
      await reserva.save();

      res.status(200).json(reserva);
    } catch (error) {
      console.error("Error updating reserva:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  deleteReserva = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findByPk(id);

      if (!reserva) {
        res.status(404).json({ error: "Reserva not found" });
        return;
      }

      await reserva.destroy();
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting reserva:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

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

export default new ReservaController();
