import { Sequelize } from 'sequelize';

// Configuração da conexão
const sequelize = new Sequelize('postgres', 'admSunset', '@PitoPuto', {
  host: 'bd-sunsetlavras.postgres.database.azure.com',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Esta configuração pode ser necessária para algumas configurações de SSL na Azure
    }
  },
  logging: false // Opcional: desativa o log SQL para uma saída mais limpa
});

// Autenticação
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
