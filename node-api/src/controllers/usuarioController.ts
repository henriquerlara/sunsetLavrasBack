import { Request, Response } from 'express';
import User from '../models/usuario';
import * as yup from 'yup';
import { bodyValidator } from '../shared/middleware/validations'

interface UsuarioAttributes {
  nome: string;
  email: string;
  senha: string;
}

export const usuarioValidation = bodyValidator((getSchema) => ({
  body: getSchema<UsuarioAttributes>(yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    senha: yup.string().required()
  }))
}));


export const createUser = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha } = req.body;
    const newUser = await User.create({ nome, email, senha });
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