"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const Usuario_model_1 = __importDefault(require("../models/Usuario.model"));
const getAllUsers = async (req, res) => {
    try {
        const usuario = await Usuario_model_1.default.findAll({
            attributes: { exclude: ["contrasenia", "codusuario"] },
        });
        if (!usuario) {
            return res.status(404).json({ error: "Error" });
        }
        res.json({ data: usuario });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=usuario.js.map