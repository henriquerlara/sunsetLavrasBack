import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Plano extends Model {
  public id!: number;
  public nome!: string;
  public descricao!: string;
  public preco!: number;
}

Plano.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Plano",
    tableName: "Plano",
    schema: "SunsetArena",
    timestamps: false,
  }
);

export default Plano;
