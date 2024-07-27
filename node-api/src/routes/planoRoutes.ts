import { Router } from 'express'
import PlanoController, { planoValidation } from '../controllers/planoController'

const router = Router();

router.post('/planos', planoValidation, PlanoController.createPlano)
router.get('/planos', PlanoController.getPlanos);
router.put('/planos/:id', planoValidation, PlanoController.updatePlano);
router.delete('/planos/:id', PlanoController.deletePlano);

export default router;