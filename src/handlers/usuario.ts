import { Request, Response } from "express";
import Usuario from "../models/Usuario.model";
import bcrypt from "bcrypt";

export const createUsuario = async (req: Request, res: Response) => {
    try {
        const usuario = new Usuario(req.body);
        const salt = await bcrypt.genSalt(10);
        usuario.contrasenia = await bcrypt.hash(req.body.contrasenia, salt);
        await usuario.save();
        res.json({ data: usuario });
    } catch (error) {
        console.log(error);
    }
};

export const getUsuarioById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ error: "El usuario no existe" });
        }

        res.json({ data: usuario });
    } catch (error) {
        console.log(error);
    }
};
