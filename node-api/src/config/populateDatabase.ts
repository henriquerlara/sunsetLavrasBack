import User from '../models/user';

const populateDatabase = async () => {
  await User.sync({ force: true }); // Recria a tabela
  await User.create({
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123' // Senha em texto plano para fins de teste
  });
};

export default populateDatabase;
