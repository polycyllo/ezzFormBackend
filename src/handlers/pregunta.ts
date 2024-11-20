import { Request, Response } from "express";

import Pregunta from "../models/Pregunta.model";

export const createPregunta =async (req: Request, res: Response) => {
    try {
        const pregunta = await Pregunta.create(req.body)
        res.json({data:pregunta})
    } catch (error) {
        console.log(error);
    }
}

export const getPreguntas =async (req: Request, res: Response) => {
    try {
        const preguntas = await Pregunta.findAll()
        res.json({data:preguntas})
    } catch (error){
        console.log(error)
    }
}

export const getPreguntaById =async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const pregunta = await Pregunta.findByPk(id)

        if(!pregunta) {
            return res.status(404).json({
                error: "Pregunta no existe"
            })
        }
        res.json({data:pregunta})
    } catch (error){
        console.log(error)
    }
}