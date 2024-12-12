"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAndAuthorize = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Usuario_model_1 = __importDefault(require("../models/Usuario.model"));
const Rol_model_1 = __importDefault(require("../models/Rol.model"));
const authenticateAndAuthorize = (requiredRole) => {
    return async (req, res, next) => {
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
                if (!usuario) {
                    return res
                        .status(500)
                        .json({
                        error: "Token no válido: usuario no encontrado",
                    });
                }
                if (requiredRole) {
                    const roles = await Rol_model_1.default.findAll({
                        where: { codusuario: usuario.codusuario },
                    });
                    const tieneRol = roles.some((rol) => rol.nombrerol === requiredRole);
                    if (!tieneRol) {
                        return res
                            .status(403)
                            .json({
                            error: `Acceso denegado: se requiere el rol ${requiredRole}`,
                        });
                    }
                }
                req.user = usuario;
                next();
            }
            else {
                res.status(500).json({ error: "Token no válido" });
            }
        }
        catch (error) {
            res.status(500).json({ error: "Token inválido o expirado" });
        }
    };
};
exports.authenticateAndAuthorize = authenticateAndAuthorize;
//# sourceMappingURL=authWithRol.js.map