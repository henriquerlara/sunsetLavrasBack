import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Plano from "./plano";
import Usuario from "./usuario";
import Quadra from "./quadra";

class Reserva extends Model {
  public id!: number;
  public dataInicio!: Date;
  public dataFim!: Date;
  public idPlano!: number;
  public idUsuario!: number;
  public idQuadra!: number;
}

Reserva.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    dataInicio: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dataFim: {
      type: DataTypes.DATE,
      allowNull: false
    },
    idPlano: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Plano,
        key: "id"
      }
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: "id"
      }
    },
    idQuadra: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Quadra,
        key: "id"
      }
    }
  },
  {
    sequelize,
    modelName: "Reserva",
    tableName: "Reserva",
    schema: "SunsetArena",
    timestamps: false
  }
);

Reserva.belongsTo(Plano, {
  foreignKey: "idPlano",
  targetKey: "id",
  as: "plano",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION"
});

Reserva.belongsTo(Usuario, {
  foreignKey: "idUsuario",
  targetKey: "id",
  as: "usuario",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION"
});

Reserva.belongsTo(Quadra, {
  foreignKey: "idQuadra",
  targetKey: "id",
  as: "quadra",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION"
});

export default Reserva;
