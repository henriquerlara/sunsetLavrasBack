import { Router } from 'express';
import userRoutes from './usuarioRoutes';
import authRoutes from './authRoutes';
import accountRoutes from './accountRoutes';
import patrocinadorRoutes from './patrocinadorRoutes';
import quadraRoutes from './quadraRoutes';
import reservaRoutes from './reservaRoutes';

const router = Router();

router.use(userRoutes);
router.use(authRoutes);
router.use(accountRoutes);
router.use(patrocinadorRoutes);
router.use(quadraRoutes);
router.use(reservaRoutes);

export default router;
