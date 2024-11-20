import { Request, Response } from "express";

import Formulario from "../models/Formulario.model";
import Pregunta from "../models/Pregunta.model";
import Opcion from "../models/Opcion.model";
export const getFormularios = async (req: Request, res: Response) => {
    try {
        const formularios = await Formulario.findAll({
            attributes: { exclude: ["codusuario"] },
        });
        res.json({ data: formularios });
    } catch (error) {
        console.log(error);
    }
};

export const getFormularioById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const formulario = await Formulario.findByPk(id, {
            include: [
                {
                    model: Pregunta,
                    as: "preguntas",
                    include: [
                        {
                            model: Opcion,
                            as: "opciones",
                            attributes: {
                                exclude: [
                                    "codusuario",
                                    "codformulario",
                                    "codpregunta",
                                    "codrespuesta",
                                ],
                            },
                        },
                    ],
                    attributes: {
                        exclude: [
                            "codusuario",
                            "codformulario",
                            "codpregunta",
                            "codrespuesta",
                        ],
                    },
                },
            ],
            attributes: {
                exclude: [
                    "codusuario",
                    "codformulario",
                    "codpregunta",
                    "codrespuesta",
                ],
            },
        });

        if (!formulario) {
            return res.status(404).json({ error: "El formulario no existe" });
        }

        res.json({ data: formulario });
    } catch (error) {
        console.error(
            "Error al obtener el formulario con sus preguntas y opciones:",
            error
        );
        res.status(500).json({
            error: "Error al obtener el formulario con sus preguntas y opciones",
        });
    }
};

export const createFormulario = async (req: Request, res: Response) => {
    const { nombreformulario, descripcion, preguntas } = req.body;

    try {
        const formulario = await Formulario.create({
            nombreformulario,
            descripcion,
        });
        for (const preguntaData of preguntas) {
            const pregunta = await Pregunta.create({
                pregunta: preguntaData.pregunta,
                tipopregunta: preguntaData.pregunta,
            });

            await formulario.$add("pregunta", pregunta);
            for (const opcionData of preguntaData.opciones) {
                await Opcion.create({
                    textoopcion: opcionData.textoopcion,
                    codpregunta: pregunta.codpregunta,
                    esrespuesta: opcionData.esrespuesta,
                });
            }
        }
        res.status(201).json({ data: formulario });
    } catch (error) {
        console.error("Error al crear el formulario:", error);
        res.status(500).json({ error: "Error al crear el formulario" });
    }
};

export const updateFormulario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const formulario = await Formulario.findByPk(id);
    if (!formulario) {
        return res.status(404).json({
            error: "el formulario no existe",
        });
    }
    await formulario.update(req.body);
    await formulario.save();
    res.json({ data: formulario });
};

export const deleteFormulario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const formulario = await Formulario.findByPk(id);
    if (!formulario) {
        return res.status(404).json({
            error: "el formulario no existe",
        });
    }
    await formulario.destroy();

    res.json({ data: "Formulario eliminado" });
};
