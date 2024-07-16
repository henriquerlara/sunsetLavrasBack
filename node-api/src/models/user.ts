import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcryptjs';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  // Método para verificar a senha
  public validPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: (user: User) => {
      user.password = bcrypt.hashSync(user.password, 10);
    }
  },
  sequelize,
  modelName: 'User'
});

// Sincroniza o modelo com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('User table has been created.');
  })
  .catch((err) => {
    console.error('Unable to create the table:', err);
  });

export default User;
