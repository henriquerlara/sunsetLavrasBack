import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcryptjs';

class Usuario extends Model {
  public id!: number;
  public cpf!: string;
  public nome!: string;
  public email!: string;
  public senha!: string;
  public telefone!: string;

  // Método para verificar a senha
  public validPassword(senha: string): boolean {
    return bcrypt.compareSync(senha, this.senha);
  }
}

Usuario.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cpf: {
    type: DataTypes.CHAR(14),
    allowNull: false,
    unique: true
  },
  nome: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(80),
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING(80),
    allowNull: false
  },
  telefone: {
    type: DataTypes.CHAR(15),
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: async (usuario: Usuario) => {
      usuario.senha = await bcrypt.hash(usuario.senha, 10);
    },
    beforeUpdate: async (usuario: Usuario) => {
      if (usuario.changed('senha')) {
        usuario.senha = await bcrypt.hash(usuario.senha, 10);
      }
    }
  },
  sequelize,
  modelName: 'Usuario',
  tableName: 'Usuario',
  schema: 'SunsetArena',
  timestamps: false // Desativa createdAt e updatedAt
});

export default Usuario;
