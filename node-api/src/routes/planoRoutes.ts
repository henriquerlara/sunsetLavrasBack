import { Router } from 'express'
import PlanoController, { planoValidation } from '../controllers/planoController'
import PlanoService from '../shared/services/planoService';
import { authenticateUser } from 'shared/middleware/auth';

const router = Router();

router.post('/planos', planoValidation, PlanoController.createPlano)
router.get('/planos', PlanoController.getPlanos);
router.put('/planos/:id', planoValidation, PlanoController.updatePlano);
router.delete('/planos/:id', PlanoController.deletePlano);
router.get('/planos/:id', authenticateUser, PlanoService.getPlanosByUserId);

export default router;