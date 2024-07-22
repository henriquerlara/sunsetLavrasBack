import sequelize from '../config/database';
import Patrocinador from '../models/patrocinador';
import Quadra from '../models/quadra';
import Usuario from '../models/usuario';
import Reserva from '../models/reserva';
import Plano from '../models/plano';	

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
      descricao: 'Descrição do patrocinador',
      imagem: 'https://example.com/image.jpg'
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
      telefone: '(12) 93456-7890'
    });


    const plano = await Plano.create({
      nome: 'Plano Exemplo',
      descricao: 'Descrição do plano',
      preco: 100.00
    });

    // Populando a tabela Reserva
    const reserva = await Reserva.create({
      dataInicio: new Date(),
      dataFim: new Date(),
      idPlano: plano.id,
      cpfUsuario: usuario.cpf,
      idQuadra: quadra.id,
    });

    console.log('Database populated with example data.');
  } catch (error) {
    console.error('Unable to populate the database:', error);
  }
};

populateDatabase();
