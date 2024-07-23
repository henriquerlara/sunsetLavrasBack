import { Request, Response } from 'express';
import Usuario from '../../models/usuario';
import bcrypt from 'bcryptjs';

export const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (usuario && await bcrypt.compare(senha, usuario.senha)) {
      req.session.usuario = { cpf: usuario.cpf, nome: usuario.nome, email: usuario.email, senha: usuario.senha, telefone: usuario.telefone }; // Armazena informações do usuário na sessão
      res.json({ message: 'Login successful', usuario: { cpf: usuario.cpf, nome: usuario.nome, email: usuario.email, telefone: usuario.telefone } });
    } else {
      res.status(401).json({ error: 'Invalcpf credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
