import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    usuario: { cpf: string, nome: string, email: string, senha: string, telefone: string };
  }
}
