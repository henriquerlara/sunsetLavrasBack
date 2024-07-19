import { Router } from 'express';
import { createUser, getUsers } from '../controllers/usuarioController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/users', createUser);
router.get('/users', getUsers); 

export default router;
