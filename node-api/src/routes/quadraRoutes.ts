import { Router } from 'express';
import QuadraController, { quadraValidation } from '../controllers/quadraController';

const router = Router();

router.post('/quadras', quadraValidation, QuadraController.createQuadra);
router.get('/quadras', QuadraController.getQuadras);
router.put('/quadras/:id', quadraValidation, QuadraController.updateQuadra);
router.delete('/quadras/:id', QuadraController.deleteQuadra);

export default router;