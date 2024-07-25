import { Router } from 'express';
import HorariosOcupadosController from '../controllers/horariosOcupadosController';

const router = Router();

router.post('/horariosOcupados', HorariosOcupadosController.createHorarioOcupado);
router.get('/horariosOcupados', HorariosOcupadosController.getHorariosOcupados);
router.delete('/horariosOcupados/:id', HorariosOcupadosController.deleteHorarioOcupado);
router.get('/horariosOcupados/:id', HorariosOcupadosController.getHorarioOcupado);
router.put('/horariosOcupados/:id', HorariosOcupadosController.updateHorarioOcupado);

export default router;