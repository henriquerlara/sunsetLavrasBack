import { Router } from 'express';
import PatrocinadorController from '../controllers/patrocinadorController';

const router = Router();

router.post('/patrocinadores', PatrocinadorController.createPatrocinador);
router.get('/patrocinadores', PatrocinadorController.getPatrocinadores);
router.put('/patrocinadores/:id', PatrocinadorController.updatePatrocinador);
router.delete('/patrocinadores/:id', PatrocinadorController.deletePatrocinador);


export default router;