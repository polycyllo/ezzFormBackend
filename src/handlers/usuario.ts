import { Request, Response } from "express";
import Usuario from "../models/Usuario.model";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const usuario = await Usuario.findAll({
            attributes: { exclude: ["contrasenia", "codusuario"] },
        });

        if (!usuario) {
            return res.status(404).json({ error: "Error" });
        }

        res.json({ data: usuario });
    } catch (error) {
        console.log(error);
    }
};
