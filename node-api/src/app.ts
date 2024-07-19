import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import sequelize from './config/database';
import router from './routes/allRoutes';

const app = express();

// Middleware e rotas
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_URL, // Endereço do frontend
  credentials: true // Permite o envio de cookies de sessão
}));

app.use(session({
  secret: 'secret key',   // Chave secreta para assinar o ID da sessão
  resave: false,               // Evita que a sessão seja salva novamente se não houver modificações
  saveUninitialized: true,    // Só salva sessões que foram inicializadas
  cookie: { secure: false }    // Configurações do cookie de sessão (deve ser true em produção com HTTPS)
}));

app.use(router);

sequelize.sync()
  .then(() => {
    console.log('Database connected and synchronized.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export default app;
