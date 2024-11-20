import { Request, Response } from "express";

import Opcion from "../models/Opcion.model";

export const createOpcion =async (req: Request, res: Response) => {
    try {
        const opcion = await Opcion.create(req.body)
        
        res.json({data:opcion})
    } catch (error) {
        console.log(error);
    }
}

