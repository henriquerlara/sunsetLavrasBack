import { Request, Response, NextFunction } from 'express';
import getRawBody from 'raw-body';

const rawBodyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  getRawBody(req, {
    length: req.headers['content-length'],
    limit: '1mb',
  }, (err, string) => {
    if (err) {
      console.error('Error in rawBodyMiddleware:', err);
      return next(err);
    }
    console.log('Raw body captured:', string);
    (req as any).rawBody = string;
    next();
  });
};

export default rawBodyMiddleware;
