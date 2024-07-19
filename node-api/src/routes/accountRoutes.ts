import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/account', (req: Request, res: Response) => {
  res.json({ user: req.session.usuario });
});

export default router;
