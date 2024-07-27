import { Router } from 'express';
import PatrocinadorController, { patrocinadorValidation } from '../controllers/patrocinadorController';

const router = Router();

router.post('/patrocinadores', patrocinadorValidation, PatrocinadorController.createPatrocinador);
router.get('/patrocinadores', PatrocinadorController.getPatrocinadores);
router.put('/patrocinadores/:id', patrocinadorValidation, PatrocinadorController.updatePatrocinador);
router.delete('/patrocinadores/:id', PatrocinadorController.deletePatrocinador);

export default router;