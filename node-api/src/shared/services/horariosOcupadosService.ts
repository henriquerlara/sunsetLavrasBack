import { Request, Response } from "express";
import HorariosOcupados from "../../models/horariosOcupados";
import Quadra from "../../models/quadra";
import { Op } from 'sequelize';

class HorariosOcupadosService {
  
  blockTimes = async (dates: string[], hours: string[], court: number, userId: number) => {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 15 * 60000); // Bloqueio por 15 minutos
  
    for (const date of dates) {
      for (const hour of hours) {
        await HorariosOcupados.create({
          data: date,
          horario: hour,
          idQuadra: court,
          idUsuario: userId,
          temporario: true,
          expiresAt: expiresAt
        });
      }
    }
  };

  clearExpiredBlocks = async () => {
    await HorariosOcupados.destroy({
      where: {
        temporario: true,
        expiresAt: {
          [Op.lt]: new Date()
        }
      }
    });
  };

  checkAvailability = async (req: Request, res: Response) => {
    try {
        const { dates } = req.body;

        const unavailableTimes: { [key: number]: string[] } = {};

        for (const date of dates) {
            const horarios = await HorariosOcupados.findAll({
                where: {
                    data: date
                }
            });

            for (const horario of horarios) {
                if (!unavailableTimes[horario.idQuadra]) {
                    unavailableTimes[horario.idQuadra] = [];
                }
                if (!unavailableTimes[horario.idQuadra].includes(horario.horario)) {
                    unavailableTimes[horario.idQuadra].push(horario.horario);
                }
            }
        }

        res.status(200).json({ unavailableTimes });
    } catch (error) {
        console.error('Error checking availability:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

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
        include: [
          {
            model: Quadra,
            as: 'quadra',
            attributes: ['id', 'nome', 'idPatrocinador'], // Selecionar os atributos desejados
          }
        ],
      });
      res.status(200).json(ocupados); // Certifique-se de enviar a resposta correta
    } catch (error) {
      console.error("Error getting horarios:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}; 

export default new HorariosOcupadosService();
