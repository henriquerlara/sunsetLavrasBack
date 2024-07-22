import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Plano from "./plano";
import Usuario from "./usuario";

class Aderencia extends Model {
  public id!: number;
  public dataInicio!: Date;
  public dataFim!: Date;
  public idPlano!: number;
  public cpfUsuario!: number;
}

Aderencia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dataInicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dataFim: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    idPlano: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Plano,
        key: "id",
      },
    },
    cpfUsuario: {
      type: DataTypes.CHAR(14),
      allowNull: false,
      references: {
        model: Usuario,
        key: "cpf",
      },
    },
  },
  {
    sequelize,
    modelName: "Aderencia",
    tableName: "Aderencia",
    schema: "sunsetArena",
    timestamps: false,
  }
);

Aderencia.belongsTo(Plano, {
  foreignKey: "idPlano",
  targetKey: "id",
  as: "plano",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
});

Aderencia.belongsTo(Usuario, {
  foreignKey: "cpfUsuario",
  targetKey: "cpf",
  as: "usuario",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

export default Aderencia;
