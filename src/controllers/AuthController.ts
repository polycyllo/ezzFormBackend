import type { Request, Response } from "express";
import Usuario from "../models/Usuario.model";
import { checkPassword, hashContrasenia } from "../utils/auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";
import { check } from "express-validator";
import { generateJWT } from "../utils/jwt";
import { resolveHostname } from "nodemailer/lib/shared";
import Rol from "../models/Rol.model";

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        try {
            const { contrasenia, correoelectronico } = req.body;
            const userExist = await Usuario.findOne({
                where: {
                    correoelectronico: correoelectronico,
                },
            });
            if (userExist) {
                const error = new Error("el usuario ya esta registrado");
                return res.status(409).json({ error: error.message });
            }
            const usuario = new Usuario(req.body);
            usuario.contrasenia = await hashContrasenia(contrasenia);
            await usuario.save();
            const token = new Token();
            token.token = generateToken();
            token.iduser = usuario.codusuario;
            await token.save();

            const rol = await Rol.create({
                codusuario: usuario.codusuario,
                nombrerol: "user",
            });
            AuthEmail.sendConfirmationEmail({
                correoelectronico: usuario.correoelectronico,
                name: usuario.nombre + " " + usuario.apellido,
                token: token.token,
            });
            res.send("Cuenta creada, revisa tu email para confirmarla");
        } catch (error) {
            res.status(500).json({ error: "hubo un error" });
        }
    };

    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body;
            const tokenExists = await Token.findOne({
                where: {
                    token: token,
                },
            });
            if (!tokenExists) {
                const error = new Error("Token no valido");
                return res.status(401).json({ error: error.message });
            }
            const usuario = await Usuario.findByPk(tokenExists.iduser);
            usuario.confirmado = true;
            await Promise.allSettled([usuario.save(), tokenExists.destroy()]);
            res.send("usuario correctamente verificado");
        } catch (error) {
            res.status(500).json({ error: "hubo un error" });
        }
    };

    static login = async (req: Request, res: Response) => {
        try {
            const { correoelectronico, contrasenia } = req.body;

            const usuario = await Usuario.findOne({
                where: {
                    correoelectronico: correoelectronico,
                },
            });

            if (!usuario) {
                const error = new Error("Usuario no encontrado");
                return res.status(401).json({ error: error.message });
            }
            if (!usuario.confirmado) {
                const token = new Token();
                token.iduser = usuario.codusuario;
                token.token = generateToken();
                await token.save();

                AuthEmail.sendConfirmationEmail({
                    correoelectronico: usuario.correoelectronico,
                    name: usuario.nombre + " " + usuario.apellido,
                    token: token.token,
                });

                const error = new Error(
                    "la cuenta no ha sido confirmada, hemos enviado un e-mail de confirmacion"
                );

                return res.status(401).json({ error: error.message });
            }
            const isPasswordCorrect = await checkPassword(
                contrasenia,
                usuario.contrasenia
            );
            if (!isPasswordCorrect) {
                const error = new Error("Contrasenia incorrecta");

                return res.status(401).json({ error: error.message });
            }

            const token = generateJWT({
                codusuario: usuario.codusuario,
            });
            res.cookie("authToken", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 10 * 60 * 60 * 1000,
            });
            ///console.log("este es el token ", token);
            res.send(token);
        } catch (error) {
            res.status(500).json({ error: "hubo un error" });
        }
    };

    static requestConfirmationToken = async (req: Request, res: Response) => {
        try {
            const { correoelectronico } = req.body;

            const usuario = await Usuario.findOne({
                where: {
                    correoelectronico: correoelectronico,
                },
            });
            if (!usuario) {
                const error = new Error("el usuario no esta registrado");
                return res.status(404).json({ error: error.message });
            }

            if (usuario.confirmado) {
                const error = new Error("el usuario ya esta confirmado");
                return res.status(409).json({ error: error.message });
            }

            const token = new Token();
            token.token = generateToken();
            token.iduser = usuario.codusuario;
            await token.save();

            //enviar email
            AuthEmail.sendConfirmationEmail({
                correoelectronico: usuario.correoelectronico,
                name: usuario.nombre + " " + usuario.apellido,
                token: token.token,
            });
            res.send("Se envio un nuevo token");
        } catch (error) {
            res.status(500).json({ error: "hubo un error" });
        }
    };

    static getUsuario = async (req: Request, res: Response) => {
        const user = req.user.dataValues;
        console.log("entra al usuario ", user);
        const rol = await Rol.findOne({
            where: {
                codusuario: user.codusuario,
            },
        });
        const ans = {
            ...user,
            rol: rol.nombrerol,
        };
        return res.json(ans);
    };
}
