import { Router } from 'express';
import { login } from '../shared/services/authService';

const router = Router();

router.post('/login', login);

export default router;
