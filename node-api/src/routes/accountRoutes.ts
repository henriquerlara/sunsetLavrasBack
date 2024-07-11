import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ user: req.session.user });
});

export default router;
