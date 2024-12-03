import { Request, Response } from "express";

import Formulario from "../models/Formulario.model";
import Pregunta from "../models/Pregunta.model";
import Opcion from "../models/Opcion.model";
export const getFormularios = async (req: Request, res: Response) => {
    try {
        const formularios = await Formulario.findAll({
            where: {
                codusuario: req.user?.codusuario,
            },
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
                                    "codformulario",
                                    "codpregunta",
                                    "codrespuesta",
                                ],
                            },
                        },
                    ],
                    attributes: {
                        exclude: [
                            "codformulario",
                            "codpregunta",
                            "codrespuesta",
                        ],
                    },
                },
            ],
            attributes: {
                exclude: ["codformulario", "codpregunta", "codrespuesta"],
            },
        });

        if (!formulario) {
            return res.status(404).json({ error: "El formulario no existe" });
        }
        if (
            formulario.codusuario.toString() !== req.user?.codusuario.toString()
        ) {
            return res.status(404).json({ error: "Accion no valida" });
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
            codusuario: req.user.codusuario,
        });
        for (const preguntaData of preguntas) {
            const pregunta = await Pregunta.create({
                pregunta: preguntaData.pregunta,
                tipopregunta: preguntaData.tipopregunta,
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
    try {
        const { id } = req.params;
        const formulario = await Formulario.findByPk(id);

        if (!formulario) {
            return res.status(404).json({
                error: "El formulario no existe",
            });
        }

        const preguntas = await Pregunta.findAll({
            where: {
                codformulario: id,
            },
        });

        for (const pregunta of preguntas) {
            await Opcion.destroy({
                where: {
                    codpregunta: pregunta.codpregunta,
                },
            });
        }

        await Pregunta.destroy({
            where: {
                codformulario: id,
            },
        });

        await formulario.destroy();

        return res.json({ message: "Formulario eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el formulario:", error);
        res.status(500).json({
            error: "Hubo un error al eliminar el formulario",
        });
    }
};
