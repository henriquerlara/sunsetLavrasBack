import { Request, Response } from 'express';
import Usuario from '../../models/usuario';
import bcrypt from 'bcryptjs';

export const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (usuario && await bcrypt.compare(senha, usuario.senha)) {
      req.session.usuario = { id: usuario.id, cpf: usuario.cpf, nome: usuario.nome, senha: usuario.senha, email: usuario.email, telefone: usuario.telefone }; // Armazena informações do usuário na sessão
      res.json({ success: true, message: 'Login successful', usuario: { id: usuario.id, cpf: usuario.cpf, nome: usuario.nome, email: usuario.email, telefone: usuario.telefone } });
    } else {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
