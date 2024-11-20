import type { Request, Response } from "express";
import Usuario from "../models/Usuario.model";
export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        try {
            const user = await Usuario.create(req.body);
            res.send("Cuenta creada, revisa tu email para confirmarla");
        } catch (error) {
            res.status(500).json({ error: "hubo un error" });
        }
    };
}
