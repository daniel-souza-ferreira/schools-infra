import { DataTypes } from 'sequelize';
import { sequelize } from '../../../src/lib/sequelize.js';

export const School = sequelize.define(
  'School', 
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nomedep: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    de: DataTypes.STRING,
    mun: DataTypes.STRING,
    distr: DataTypes.STRING,
    codesc: DataTypes.STRING,
    nomesc: DataTypes.STRING,
    tipoesc: DataTypes.INTEGER,
    tipoesc_desc: DataTypes.STRING,
    codsit: DataTypes.STRING,
  }, 
  {
    tableName: 'schools',
    timestamps: false,
    schema: 'public',
  }
);