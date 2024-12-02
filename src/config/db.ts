import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT as Dialect,
        port: Number(process.env.DB_PORT),
        models: [__dirname + "/../models/**/*.ts"],
        logging: false,
    }
);

export default db;
