import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export async function sendPasswordResetEmail(email: string) {
  try {
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '15m' });

    const transporter = nodemailer.createTransport({
      service: 'Outlook',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Redefinição de Senha',
      text: `Para redefinir sua senha, por favor clique no link abaixo:\n\nhttp://localhost:8080/reset-password?token=${token}\n\nEste link irá expirar em 15 minutos.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to: ${email}`);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
}
