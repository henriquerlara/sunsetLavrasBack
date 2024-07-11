import { User } from '../../models/user';

declare module 'express-serve-static-core' {
  interface Request {
    user?: { id: number; email: string; password: string };
  }
}
