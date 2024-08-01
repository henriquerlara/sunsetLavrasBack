import { Router } from 'express';
import ReservaController, { reservaValidation } from '../controllers/reservaController';
import horariosOcupadosService from 'shared/services/horariosOcupadosService';

const router = Router();

router.post('/reservas', reservaValidation, ReservaController.createReserva, horariosOcupadosService.createHorariosOcupadosByReserva);
router.get('/reservas', ReservaController.getReservas);
router.put('/reservas/:id', reservaValidation, ReservaController.updateReserva);
router.delete('/reservas/:id', ReservaController.deleteReserva);

export default router;