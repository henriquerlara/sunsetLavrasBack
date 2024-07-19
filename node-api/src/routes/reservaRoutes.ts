import { Router } from 'express';
import ReservaController from '../controllers/reservaController';

const router = Router();

router.post('/reservas', ReservaController.createReserva);
router.get('/reservas', ReservaController.getReservas);
router.put('/reservas/:id', ReservaController.updateReserva);
router.delete('/reservas/:id', ReservaController.deleteReserva);

export default router;