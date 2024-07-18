import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Patrocinador from './patrocinador';

class Quadra extends Model {
  public id!: number;
  public nome!: string;
  public idPatrocinador!: number;
}

Quadra.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING(60),
    allowNull: true
  },
  idPatrocinador: {
    type: DataTypes.INTEGER,
    references: {
      model: Patrocinador,
      key: 'id'
    },
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Quadra',
  tableName: 'Quadra',
  schema: 'SunsetArena',
  timestamps: false // Desativa createdAt e updatedAt
});

// Definir associação com constraints
Quadra.belongsTo(Patrocinador, {
    foreignKey: 'idPatrocinador',
    targetKey: 'id',
    as: 'patrocinador',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  });

export default Quadra;
