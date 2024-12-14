"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const Formulario_model_1 = __importDefault(require("../models/Formulario.model"));
const FormularioRespondido_model_1 = __importDefault(require("../models/FormularioRespondido.model"));
const FormularioToken_model_1 = __importDefault(require("../models/FormularioToken.model"));
const Opcion_model_1 = __importDefault(require("../models/Opcion.model"));
const Pregunta_model_1 = __importDefault(require("../models/Pregunta.model"));
const RespuestaUsuario_1 = __importDefault(require("../models/RespuestaUsuario"));
const Rol_model_1 = __importDefault(require("../models/Rol.model"));
const Token_1 = __importDefault(require("../models/Token"));
const Usuario_model_1 = __importDefault(require("../models/Usuario.model"));
dotenv_1.default.config();
const db = new sequelize_typescript_1.Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    //models: [__dirname + "/../models/**/*.ts"],
    models: [
        Formulario_model_1.default,
        FormularioRespondido_model_1.default,
        FormularioToken_model_1.default,
        Opcion_model_1.default,
        Pregunta_model_1.default,
        RespuestaUsuario_1.default,
        Rol_model_1.default,
        Token_1.default,
        Usuario_model_1.default,
    ],
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