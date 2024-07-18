import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.usuario) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
