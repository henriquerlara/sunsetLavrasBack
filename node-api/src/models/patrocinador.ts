import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

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
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Patrocinador',
  tableName: 'patrocinador',
  schema: 'SunsetArena',
  timestamps: false // Desativa createdAt e updatedAt
});

export default Patrocinador;
