import { Router } from 'express';
import HorariosOcupadosController, { horariosOcupadosValidation } from '../controllers/horariosOcupadosController';
import HorariosOcupadosService from "../shared/services/horariosOcupadosService";


const router = Router();

router.post('/horariosOcupados', horariosOcupadosValidation, HorariosOcupadosController.createHorarioOcupado);
router.get('/horariosOcupados', HorariosOcupadosController.getHorariosOcupados);
router.delete('/horariosOcupados/:id', HorariosOcupadosController.deleteHorarioOcupado);
router.put('/horariosOcupados/:id', horariosOcupadosValidation, HorariosOcupadosController.updateHorarioOcupado);
router.get('/horariosOcupados/:data/:idQuadra', HorariosOcupadosService.getHorariosOcupadosbyDateAndQuadraId);
router.get('/horariosOcupados/:idUsuario', HorariosOcupadosService.getHorariosOcupadosbyUserId);
router.post('/checkAvailability', HorariosOcupadosService.checkAvailability); 

router.post('/blockTimes', async (req, res) => {
    try {
      const { dates, hours, court, userId } = req.body;
      await HorariosOcupadosService.blockTimes(dates, hours, court, userId);
      res.status(200).json({ message: 'Horários bloqueados temporariamente' });
    } catch (error) {
      console.error('Error blocking times:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export default router;