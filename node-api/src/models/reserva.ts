import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Usuario from './usuario';
import Quadra from './quadra';

class Reserva extends Model {
  public id!: number;
  public data!: Date;
  public cpfUsuario!: string;
  public idQuadra!: number;
}

Reserva.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: true
  },
  cpfUsuario: {
    type: DataTypes.CHAR(14),
    allowNull: false,
    references: {
      model: Usuario,
      key: 'cpf'
    }
  },
  idQuadra: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Quadra,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Reserva',
  tableName: 'Reserva',
  schema: 'SunsetArena',
  timestamps: false // Desativa createdAt e updatedAt
});

// Definir associações com constraints
Reserva.belongsTo(Usuario, {
  foreignKey: 'cpfUsuario',
  targetKey: 'cpf',
  as: 'usuario',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION'
});

Reserva.belongsTo(Quadra, {
  foreignKey: 'idQuadra',
  targetKey: 'id',
  as: 'quadra',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION'
});

export default Reserva;
