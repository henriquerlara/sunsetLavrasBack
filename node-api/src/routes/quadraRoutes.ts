import { Router } from 'express';
import QuadraController from '../controllers/quadraController';

const router = Router();

router.post('/quadras', QuadraController.createQuadra);
router.get('/quadras', QuadraController.getQuadras);
router.put('/quadras/:id', QuadraController.updateQuadra);
router.delete('/quadras/:id', QuadraController.deleteQuadra);

export default router;