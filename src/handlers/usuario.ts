import { Request, Response } from "express";
import Usuario from "../models/Usuario.model";

export const createUsuario = async (req: Request, res: Response) => {
    try {
        const usuario = await Usuario.create(req.body);
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
