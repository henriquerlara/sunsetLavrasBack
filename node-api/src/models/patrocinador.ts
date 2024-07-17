import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcryptjs';

class Patrocinador extends Model {
  public id!: number;
  public nome!: string;
  public descricao!: string;
  public imagem!: string;
}

Patrocinador.init({
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

export default Patrocinador;
