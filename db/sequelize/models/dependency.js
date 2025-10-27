import { DataTypes } from 'sequelize';
import { sequelize } from '../../../src/lib/sequelize.js';
import { School } from './school.js';

export const Dependency = sequelize.define(
  'Dependency', 
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: DataTypes.STRING,
    quantidade: DataTypes.INTEGER,
    school_id: DataTypes.UUID,
  }, 
  {
    tableName: 'dependencies',
    timestamps: false,
    schema: 'public',
  }
);

School.hasMany(Dependency, { foreignKey: 'school_id', onDelete: 'CASCADE' })
Dependency.belongsTo(School, { foreignKey: 'school_id', onDelete: 'CASCADE' })