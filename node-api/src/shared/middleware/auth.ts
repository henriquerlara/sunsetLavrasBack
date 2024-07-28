import { RequestHandler } from 'express';

export const authenticateUser: RequestHandler = (req, res, next) => {
  if (req.session && req.session.usuario && req.session.usuario.id.toString() == req.params.id) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
