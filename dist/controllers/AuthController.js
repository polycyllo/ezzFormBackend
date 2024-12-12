"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const Usuario_model_1 = __importDefault(require("../models/Usuario.model"));
const auth_1 = require("../utils/auth");
const Token_1 = __importDefault(require("../models/Token"));
const token_1 = require("../utils/token");
const AuthEmail_1 = require("../emails/AuthEmail");
const jwt_1 = require("../utils/jwt");
const Rol_model_1 = __importDefault(require("../models/Rol.model"));
class AuthController {
    static createAccount = async (req, res) => {
        try {
            const { contrasenia, correoelectronico } = req.body;
            //Prevenir dup
            const userExist = await Usuario_model_1.default.findOne({
                where: {
                    correoelectronico: correoelectronico,
                },
            });
            if (userExist) {
                const error = new Error("el usuario ya esta registrado");
                return res.status(409).json({ error: error.message });
            }
            const usuario = new Usuario_model_1.default(req.body);
            usuario.contrasenia = await (0, auth_1.hashContrasenia)(contrasenia);
            await usuario.save();
            const token = new Token_1.default();
            token.token = (0, token_1.generateToken)();
            token.iduser = usuario.codusuario;
            await token.save();
            const rol = await Rol_model_1.default.create({
                codusuario: usuario.codusuario,
                nombrerol: "user",
            });
            //enviar email
            AuthEmail_1.AuthEmail.sendConfirmationEmail({
                correoelectronico: usuario.correoelectronico,
                name: usuario.nombre + " " + usuario.apellido,
                token: token.token,
            });
            res.send("Cuenta creada, revisa tu email para confirmarla");
        }
        catch (error) {
            res.status(500).json({ error: "hubo un error" });
        }
    };
    static confirmAccount = async (req, res) => {
        try {
            const { token } = req.body;
            const tokenExists = await Token_1.default.findOne({
                where: {
                    token: token,
                },
            });
            if (!tokenExists) {
                const error = new Error("Token no valido");
                return res.status(401).json({ error: error.message });
            }
            const usuario = await Usuario_model_1.default.findByPk(tokenExists.iduser);
            usuario.confirmado = true;
            await Promise.allSettled([usuario.save(), tokenExists.destroy()]);
            res.send("usuario correctamente verificado");
        }
        catch (error) {
            res.status(500).json({ error: "hubo un error" });
        }
    };
    static login = async (req, res) => {
        try {
            const { correoelectronico, contrasenia } = req.body;
            console.log("Cookies recibidas:", req.cookies);
            const usuario = await Usuario_model_1.default.findOne({
                where: {
                    correoelectronico: correoelectronico,
                },
            });
            if (!usuario) {
                const error = new Error("Usuario no encontrado");
                return res.status(401).json({ error: error.message });
            }
            if (!usuario.confirmado) {
                const token = new Token_1.default();
                token.iduser = usuario.codusuario;
                token.token = (0, token_1.generateToken)();
                await token.save();
                //enviar email
                AuthEmail_1.AuthEmail.sendConfirmationEmail({
                    correoelectronico: usuario.correoelectronico,
                    name: usuario.nombre + " " + usuario.apellido,
                    token: token.token,
                });
                const error = new Error("la cuenta no ha sido confirmada, hemos enviado un e-mail de confirmacion");
                return res.status(401).json({ error: error.message });
            }
            const isPasswordCorrect = await (0, auth_1.checkPassword)(contrasenia, usuario.contrasenia);
            if (!isPasswordCorrect) {
                const error = new Error("Contrasenia incorrecta");
                return res.status(401).json({ error: error.message });
            }
            //const rol = await Rol.findByPk(usuario.codusuario);
            const token = (0, jwt_1.generateJWT)({
                codusuario: usuario.codusuario,
                //rol: rol.nombrerol || "user",
            });
            res.cookie("authToken", token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
                maxAge: 2 * 60 * 60 * 1000,
            });
            //console.log("token ", token);
            res.send(token);
        }
        catch (error) {
            res.status(500).json({ error: "hubo un error" });
        }
    };
    static requestConfirmationToken = async (req, res) => {
        try {
            const { correoelectronico } = req.body;
            //este usuario tiene que existir
            const usuario = await Usuario_model_1.default.findOne({
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
            const token = new Token_1.default();
            token.token = (0, token_1.generateToken)();
            token.iduser = usuario.codusuario;
            await token.save();
            //enviar email
            AuthEmail_1.AuthEmail.sendConfirmationEmail({
                correoelectronico: usuario.correoelectronico,
                name: usuario.nombre + " " + usuario.apellido,
                token: token.token,
            });
            res.send("Se envio un nuevo token");
        }
        catch (error) {
            res.status(500).json({ error: "hubo un error" });
        }
    };
    static getUsuario = async (req, res) => {
        const user = req.user.dataValues;
        const rol = await Rol_model_1.default.findOne({
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
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map