import { Router, Request, Response } from 'express';

const router = Router();

router.get('/account', (req: Request, res: Response) => {
  if (req.session.usuario) {
    res.json({ isAuthenticated: true, user: req.session.usuario });
  } else {
    res.status(401).json({ isAuthenticated: false, message: 'Not authenticated' });
  }
});

export default router;
