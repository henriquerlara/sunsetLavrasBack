import { Router } from 'express';
import { createUser, getUsers } from '../controllers/userController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', createUser);
router.get('/', getUsers); 

export default router;
