import { Router } from 'express'
import PlanoController from '../controllers/planoController'

const router = Router();

router.post('/planos', PlanoController.createPlano)
router.post('/planos', PlanoController.getPlanos);
router.post('/planos/:id', PlanoController.updatePlano);
router.post('/planos/:id', PlanoController.deletePlano);

export default router;