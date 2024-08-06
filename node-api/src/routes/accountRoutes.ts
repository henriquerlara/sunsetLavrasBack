import { Router, Request, Response } from 'express';
import Usuario from '../models/usuario';

const router = Router();

// Rota para obter as informações da conta
router.get('/account', (req: Request, res: Response) => {
  if (req.session.usuario) {
    res.json({ isAuthenticated: true, user: req.session.usuario });
  } else {
    res.status(401).json({ isAuthenticated: false, message: 'Not authenticated' });
  }
});

// Rota para atualizar as informações da conta
router.put('/account', async (req: Request, res: Response) => {
  if (!req.session.usuario) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const userId = req.session.usuario.id;
  const { nome, email, cpf, telefone } = req.body;

  if (!nome || !email || !cpf || !telefone) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const user = await Usuario.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    user.nome = nome;
    user.email = email;
    user.cpf = cpf;
    user.telefone = telefone.trim();

    await user.save();

    req.session.usuario = { id: user.id, cpf: user.cpf, nome: user.nome, email: user.email, telefone: user.telefone };

    return res.json({ message: 'Usuário atualizado com sucesso'});
  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error);
    return res.status(500).json({ message: 'Erro ao atualizar usuário', error });
  }
});


export default router;
