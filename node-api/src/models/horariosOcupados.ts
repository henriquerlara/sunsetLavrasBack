import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Quadra from './quadra';
import Usuario from './usuario';

class HorariosOcupados extends Model {
  public id!: number;
  public data!: string; // Será armazenada como string no formato YYYY-MM-DD
  public horario!: string; // Formato HH:mm
  public idQuadra!: number;
  public idUsuario!: number;
}

HorariosOcupados.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  data: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  horario: {
    type: DataTypes.STRING(5),
    allowNull: false
  },
  idQuadra: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Quadra,
      key: "id"
    }
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id'
    }
<<<<<<< Updated upstream
  }
=======
  },
>>>>>>> Stashed changes
}, {
  sequelize,
  modelName: 'HorariosOcupados',
  tableName: 'HorariosOcupados',
  schema: 'SunsetArena',
  timestamps: false, // Desativa createdAt e updatedAt
  indexes: [
    {
      unique: true,
      fields: ['data', 'horario', 'idQuadra']
    }
  ]
});

HorariosOcupados.belongsTo(Quadra, {
  foreignKey: 'idQuadra',
  targetKey: 'id',
  as: 'quadra',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION'
});

HorariosOcupados.belongsTo(Usuario, {
  foreignKey: 'idUsuario',
  targetKey: 'id',
  as: 'usuario',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION'
});

export default HorariosOcupados;
