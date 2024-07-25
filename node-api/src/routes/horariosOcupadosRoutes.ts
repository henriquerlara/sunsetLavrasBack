import { Router } from 'express';
import HorariosOcupadosController from '../controllers/horariosOcupadosController';
import HorariosOcupadosService from "../shared/services/horariosOcupadosService";


const router = Router();

router.post('/horariosOcupados', HorariosOcupadosController.createHorarioOcupado);
router.get('/horariosOcupados', HorariosOcupadosController.getHorariosOcupados);
router.delete('/horariosOcupados/:id', HorariosOcupadosController.deleteHorarioOcupado);
router.get('/horariosOcupados/:id', HorariosOcupadosController.getHorarioOcupado);
router.put('/horariosOcupados/:id', HorariosOcupadosController.updateHorarioOcupado);
router.get('/horariosOcupados/:data/:idQuadra', HorariosOcupadosService.getHorariosOcupados);

export default router;