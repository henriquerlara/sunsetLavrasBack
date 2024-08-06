import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    usuario: { cpf: string, id: number, nome: string, email: string, telefone: string };
  }
}
