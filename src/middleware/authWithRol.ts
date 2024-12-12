import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.model";
import Rol from "../models/Rol.model";

declare global {
    namespace Express {
        interface Request {
            user?: Usuario;
        }
    }
}

export const authenticateAndAuthorize = (requiredRole?: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const bearer = req.headers.authorization;
        if (!bearer) {
            const error = new Error("No autorizado");
            return res.status(401).json({ error: error.message });
        }

        const [, token] = bearer.split(" ");
        try {
            const decoded = jwt.verify(token, process.env.JSW_PWD);

            if (typeof decoded === "object" && decoded.codusuario) {
                const usuario = await Usuario.findOne({
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
                    const roles = await Rol.findAll({
                        where: { codusuario: usuario.codusuario },
                    });

                    const tieneRol = roles.some(
                        (rol) => rol.nombrerol === requiredRole
                    );

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
            } else {
                res.status(500).json({ error: "Token no válido" });
            }
        } catch (error) {
            res.status(500).json({ error: "Token inválido o expirado" });
        }
    };
};
