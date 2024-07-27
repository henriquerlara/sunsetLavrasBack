import { Request, Response } from 'express';
import User from '../models/usuario';
import * as yup from 'yup';
import { bodyValidator } from '../shared/middleware/validations'

interface UsuarioAttributes {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  telefone: string;
}

const bodyValidation: yup.ObjectSchema<UsuarioAttributes> = yup.object().shape({
  nome: yup.string().required(),
  email: yup.string().email().required(),
  senha: yup.string().required(),
  cpf: yup.string().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'O CPF deve estar no formato XXX.XXX.XXX-XX').required(),
  telefone: yup.string().matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'O telefone deve estar no formato (XX) XXXXX-XXXX').required(),
});

export const createUser = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, cpf, telefone } = req.body;
    const newUser = await User.create({ nome, email, senha, cpf, telefone });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
