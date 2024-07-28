import e from 'express';
import sequelize from '../config/database';
import Patrocinador from '../models/patrocinador';
import Plano from '../models/plano';
import Quadra from '../models/quadra';
import Reserva from '../models/reserva';
import Usuario from '../models/usuario';
import HorariosOcupados from '../models/horariosOcupados';

const populateDatabase = async () => {
  try {
    // Conectar ao banco de dados
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sincronizar os modelos com o banco de dados
    await sequelize.sync({ force: true });
    console.log('Database & tables created!');

    // Populando a tabela Patrocinador
    const patrocinador = await Patrocinador.create({
      nome: 'Patrocinador Exemplo',
      descricao: 'Descrição do patrocinador exemplo',
      imagem: 'imagem_url_exemplo'
    });

    // Populando a tabela Plano
    const plano = await Plano.create({
      nome: 'Plano Exemplo',
      descricao: 'Descrição do plano exemplo',
      preco: 99.99
    });

    // Populando a tabela Quadra
    const quadra = await Quadra.create({
      nome: 'Quadra Exemplo',
      idPatrocinador: patrocinador.id
    });

    // Populando a tabela Usuario
    const usuario = await Usuario.create({
      cpf: '123.456.789-00',
      nome: 'Usuario Exemplo',
      email: 'usuario@example.com',
      senha: 'senha123', // Senha será hasheada pelo hook beforeCreate
      telefone: '1234567890'
    });

    // Populando a tabela Reserva
    const reserva = await Reserva.create({
      dataInicio: new Date(),
      dataFim: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hora depois
      idPlano: plano.id,
      idUsuario: usuario.id,
      idQuadra: quadra.id
    });

    // Populando a tabela HorariosOcupados
    const horariosOcupados = await HorariosOcupados.create({
      data: '2021-12-31',
      horario: '12:00',
      idQuadra: quadra.id,
      idUsuario: usuario.id
    });

    console.log('Database populated with example data.');
  } catch (error) {
    console.error('Unable to populate the database:', error);
  }
};

populateDatabase();

export default populateDatabase;