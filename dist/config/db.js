"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = new sequelize_typescript_1.Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    models: [__dirname + "/../models/**/*.ts"],
});
exports.default = db;
//dejar con lo de arriba en caso de usar una bd ya lista para hacer pruebas
//caso contrario comentar, borrar lo de arriba y descomentar lo de abajo
// import { Sequelize } from "sequelize-typescript";
// import { Dialect } from "sequelize";
// import dotenv from "dotenv";
// dotenv.config();
// const db = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         host: process.env.DB_HOST,
//         dialect: process.env.DB_DIALECT as Dialect,
//         port: Number(process.env.DB_PORT),
//         models: [__dirname + "/../models/**/*.ts"],
//         logging: false,
//     }
// );
// export default db;
//# sourceMappingURL=db.js.map