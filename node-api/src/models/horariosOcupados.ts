import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class HorariosOcupados extends Model {
  public id!: number;
  public data!: string;
  public horario!: string;
  public idQuadra!: number;
}

HorariosOcupados.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  horario: {
    type: DataTypes.STRING(5),
    allowNull: false
  },
  idQuadra: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'HorariosOcupados',
  tableName: 'HorariosOcupados',
  schema: 'SunsetArena',
  timestamps: false // Desativa createdAt e updatedAt
});

export default HorariosOcupados;