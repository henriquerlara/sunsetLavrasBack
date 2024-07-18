import { User } from '../../models/usuario';

declare module 'express-serve-static-core' {
  interface Request {
    usuario?: { cpf: string, nome: string, email: string, senha: string, telefone: string };
  }
}
