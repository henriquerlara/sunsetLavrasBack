import { Request, Response } from 'express';
import { sendPasswordResetEmail } from '../shared/services/emailService';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/usuario'; // Ensure this model is correctly defined

export async function requestPasswordReset(req: Request, res: Response) {
  const { email } = req.body;
  try {
    console.log('Password reset request received for email:', email);

    // Check if the email is registered
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Send password reset email
    await sendPasswordResetEmail(email);
    console.log('Password reset email sent to:', email);
    res.json({ message: 'Email de redefinição de senha enviado.' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ error: 'Erro ao enviar e-mail de redefinição de senha.' });
  }
}

export async function resetPassword(req: Request, res: Response) {
  const { token, newPassword } = req.body;
  try {
    console.log('Resetting password with token:', token);

    // Verify JWT token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    console.log('Token decoded:', decoded);

    // Find the user by the email in the token
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) {
      console.log('User not found for email:', decoded.email);
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Update user's password with a hashed version
    console.log(newPassword)
    user.senha = newPassword;
    await user.save();
    console.log('Password updated successfully for user:', user.email);

    res.json({ message: 'Senha redefinida com sucesso.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(400).json({ error: 'Token inválido ou expirado.' });
  }
}
