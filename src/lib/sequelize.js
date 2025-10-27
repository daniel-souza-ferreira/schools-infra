import { Sequelize } from 'sequelize';
import { env } from '../env/index.js';

export const sequelize = new Sequelize(
    env.DB_NAME,
    env.DB_USER,
    env.DB_PASSWORD,
    {
        host: env.DB_HOST,
        port: env.DB_PORT,
        dialect: 'postgres',
        logging: false
    }
)