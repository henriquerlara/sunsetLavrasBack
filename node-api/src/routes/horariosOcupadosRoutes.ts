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

export default router;