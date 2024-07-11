import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: { id: number; name: string; email: string; password: string };
  }
}
