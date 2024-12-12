"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Usuario_model_1 = __importDefault(require("../models/Usuario.model"));
const authenticate = async (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        const error = new Error("No autorizado");
        return res.status(401).json({ error: error.message });
    }
    const [, token] = bearer.split(" ");
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JSW_PWD);
        if (typeof decoded === "object" && decoded.codusuario) {
            const usuario = await Usuario_model_1.default.findOne({
                where: {
                    codusuario: decoded.codusuario,
                },
                attributes: {
                    exclude: [
                        "contrasenia",
                        "fechadecreaciondecuenta",
                        "confirmado",
                    ],
                },
            });
            if (usuario) {
                req.user = usuario;
                next();
            }
            else {
                res.status(500).json({ error: "Token no valido" });
            }
        }
    }
    catch (error) {
        res.status(500).json({ error: "Token novalido" });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.js.map