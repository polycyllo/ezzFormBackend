import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Formulario from "../models/Formulario.model";
import Pregunta from "../models/Pregunta.model";
import Opcion from "../models/Opcion.model";
import FormularioToken from "../models/FormularioToken.model";
import FormularioRespondido from "../models/FormularioRespondido.model";
import RespuestaUsuario from "../models/RespuestaUsuario";
import Usuario from "../models/Usuario.model";
import { Op } from "sequelize";
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

        const formsRespondidos = await FormularioRespondido.findAll({
            where: {
                codformulario: formulario.codformulario,
            },
        });

        for (const formRespondido of formsRespondidos) {
            await RespuestaUsuario.destroy({
                where: {
                    codformulariorespondido:
                        formRespondido.codformulariorespondido,
                },
            });
        }
        await FormularioRespondido.destroy({
            where: {
                codformulario: formulario.codformulario,
            },
        });
        await FormularioToken.destroy({
            where: {
                codformulario: id,
            },
        });

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

export const createTokenForm = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { fechainicio, fechafin } = req.body;
        const formulario = await Formulario.findByPk(id);

        if (!formulario) {
            return res.status(404).json({
                error: "El formulario no existe",
            });
        }
        const token = uuidv4();
        const tokenRecord = await FormularioToken.create({
            codformulario: id,
            token,
            fechainicio,
            fechafin,
        });
        //await tokenRecord.save();
        const hostResponse =
            process.env.HOST_RESPONSE || `${req.protocol}://${req.get("host")}`;
        const link = `${hostResponse}/responder/${token}`;

        res.json({ link });
    } catch (error) {
        res.status(500).json({
            error: "Hubo un error al crear el link del formulario",
        });
    }
};

export const getLinksForm = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const links = await FormularioToken.findAll({
            where: { codformulario: id },
            attributes: [
                "codformulariotoken",
                "token",
                "fechainicio",
                "fechafin",
            ],
        });

        // if (!links || links.length === 0) {
        //     return res.status(404).json({
        //         error: "No hay enlaces creados para este formulario.",
        //     });
        // }

        const hostResponse =
            process.env.HOST_RESPONSE || `${req.protocol}://${req.get("host")}`;
        const formattedLinks = links.map((link) => ({
            codformulariotoken: link.codformulariotoken,
            link: `${hostResponse}/responder/${link.token}`,
            fechainicio: link.fechainicio,
            fechafin: link.fechafin,
        }));

        res.json(formattedLinks);
    } catch (error) {
        console.error("Error al obtener enlaces:", error);
        res.status(500).json({ error: "Error al obtener los enlaces." });
    }
};

export const deleteLinkForm = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const link = await FormularioToken.findByPk(id);

        if (!link) {
            return res.status(404).json({ error: "Enlace no encontrado." });
        }

        await link.destroy();
        res.json({ message: "Enlace eliminado correctamente." });
    } catch (error) {
        console.error("Error al eliminar el enlace:", error);
        res.status(500).json({ error: "Error al eliminar el enlace." });
    }
};

export const responderForm = async (req: Request, res: Response) => {
    try {
        const { token } = req.params;
        const { respuestas, codusuario } = req.body;

        const tokenRecord = await FormularioToken.findOne({ where: { token } });
        if (!tokenRecord) {
            return res.status(404).json({ error: "El formulario no existe." });
        }

        const now = new Date();
        if (now < tokenRecord.fechainicio || now > tokenRecord.fechafin) {
            return res.status(403).json({
                error: "El formulario no está disponible para responder.",
            });
        }

        const tokenformulariousuario = uuidv4();
        const formularioRespondido = await FormularioRespondido.create({
            codusuario,
            codformulario: tokenRecord.codformulario,
            fecharespuesta: now,
            tokenformulariousuario,
        });

        if (!formularioRespondido) {
            throw new Error(
                "No se pudo crear el registro en formulariorespondido."
            );
        }
        for (const respuesta of respuestas) {
            try {
                const pregunta = await Pregunta.findOne({
                    where: { codpregunta: respuesta.codpregunta },
                });

                if (!pregunta) {
                    console.error(
                        `Pregunta con código ${respuesta.codpregunta} no encontrada.`
                    );
                    continue;
                }

                if (
                    pregunta.tipopregunta === "circulo" ||
                    pregunta.tipopregunta === "cuadrado"
                ) {
                    if (Array.isArray(respuesta.respuestasSeleccionadas)) {
                        for (const idRespuesta of respuesta.respuestasSeleccionadas) {
                            await RespuestaUsuario.create({
                                codpregunta: respuesta.codpregunta,
                                idrespuesta: idRespuesta,
                                codformulariorespondido:
                                    formularioRespondido.codformulariorespondido,
                                respuestatexto: null,
                            });
                        }
                    }
                } else if (
                    pregunta.tipopregunta === "texto" ||
                    pregunta.tipopregunta === "numeros" ||
                    pregunta.tipopregunta === "textoLibre"
                ) {
                    if (respuesta.respuestatexto) {
                        await RespuestaUsuario.create({
                            codpregunta: respuesta.codpregunta,
                            idrespuesta: null,
                            codformulariorespondido:
                                formularioRespondido.codformulariorespondido,
                            respuestatexto: respuesta.respuestatexto,
                        });
                    }
                } else {
                    console.warn(
                        `Tipo de pregunta desconocido: ${pregunta.tipopregunta}`
                    );
                }
            } catch (error) {
                console.error(
                    `Error al guardar respuesta para la pregunta ${respuesta.codpregunta}:`,
                    error
                );
            }
        }

        res.status(200).json({
            message: "Respuestas registradas correctamente.",
        });
    } catch (error) {
        console.error("Error al registrar respuestas:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};

export const getFormularioByToken = async (req: Request, res: Response) => {
    const { token } = req.params;
    try {
        const formularioToken = await FormularioToken.findOne({
            where: { token },
        });
        if (!formularioToken) {
            return res.status(404).json({
                error: "El formulario no existe o no está disponible.",
            });
        }
        const formulario = await Formulario.findOne({
            where: { codformulario: formularioToken.codformulario },
            include: [
                {
                    model: Pregunta,
                    include: [
                        {
                            model: Opcion,
                            attributes: { exclude: ["esrespuesta"] },
                        },
                    ],
                },
            ],
        });
        if (!formulario) {
            return res.status(404).json({ error: "Formulario no encontrado." });
        }
        const response = {
            ...formulario.toJSON(),
            fechainicio: formularioToken.fechainicio,
            fechafin: formularioToken.fechafin,
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el formulario." });
    }
};

export const getRespuestasPorRangoFechas = async (
    req: Request,
    res: Response
) => {
    try {
        const { codformulario } = req.params;
        if (!codformulario) {
            return res
                .status(400)
                .json({ error: "El parámetro codformulario es obligatorio." });
        }

        // Obtener los rangos de fechas del formulario
        const rangosFechas = await FormularioToken.findAll({
            where: { codformulario },
            attributes: ["fechainicio", "fechafin"],
        });

        if (!rangosFechas || rangosFechas.length === 0) {
            return res.status(404).json({
                error: "No se encontraron rangos de fechas para este formulario.",
            });
        }

        // Obtener respuestas por rango de fechas y agregar información del usuario
        const respuestasPorRango = await Promise.all(
            rangosFechas.map(async (rango) => {
                const respuestas = await FormularioRespondido.findAll({
                    where: {
                        codformulario,
                        fecharespuesta: {
                            [Op.between]: [rango.fechainicio, rango.fechafin],
                        },
                    },
                    attributes: [
                        "codformulariorespondido",
                        "codusuario",
                        "fecharespuesta",
                        "tokenformulariousuario",
                    ],
                    include: [
                        {
                            model: Usuario,
                            attributes: ["correoelectronico"],
                        },
                    ],
                });

                const formattedRespuestas = respuestas.map((respuesta) => ({
                    codformulariorespondido: respuesta.codformulariorespondido,
                    tokenformulariousuario: respuesta.tokenformulariousuario,
                    fecharespuesta: respuesta.fecharespuesta,
                    correoelectronico:
                        respuesta.usuario?.correoelectronico || null,
                }));

                return {
                    fechainicio: rango.fechainicio,
                    fechafin: rango.fechafin,
                    respuestas: formattedRespuestas,
                };
            })
        );

        res.json(respuestasPorRango);
    } catch (error) {
        console.error(
            "Error al obtener respuestas por rango de fechas:",
            error
        );
        res.status(500).json({ error: "Error interno del servidor." });
    }
};

export const getFormularioRespondidoByUser = async (
    req: Request,
    res: Response
) => {
    try {
        const { token } = req.params;

        const formularioRespondido = await FormularioRespondido.findOne({
            where: { tokenformulariousuario: token },
            include: [
                {
                    model: RespuestaUsuario,
                    attributes: [
                        "codpregunta",
                        "idrespuesta",
                        "respuestatexto",
                    ],
                },
                {
                    model: Usuario,
                    attributes: ["correoelectronico"],
                },
            ],
        });
        //res.json(formularioRespondido);
        //console.log("fomrulario respondido ", formularioRespondido);
        if (!formularioRespondido) {
            return res.status(404).json({
                error: "No se encontraron respuestas para el token proporcionado.",
            });
        }

        const formularioOriginal = await Formulario.findByPk(
            formularioRespondido.codformulario,
            {
                include: [
                    {
                        model: Pregunta,
                        as: "preguntas",
                        include: [
                            {
                                model: Opcion,
                                as: "opciones",
                            },
                        ],
                    },
                ],
            }
        );

        if (!formularioOriginal || !formularioOriginal.preguntas) {
            return res.status(404).json({
                error: "No se encontró el formulario original.",
            });
        }

        const resultados = formularioOriginal.preguntas.map(
            (pregunta: Pregunta) => {
                const respuestasUsuario =
                    formularioRespondido.respuestasUsuario.filter(
                        (resp: RespuestaUsuario) =>
                            resp.codpregunta === pregunta.codpregunta
                    );

                const opciones = pregunta.opciones.map((opcion: Opcion) => {
                    const respuestaUsuario = respuestasUsuario.find(
                        (respuesta) =>
                            respuesta.idrespuesta === opcion.codrespuesta
                    );

                    return {
                        ...opcion.toJSON(),
                        esSeleccionada: Boolean(respuestaUsuario),
                    };
                });
                const respuestaTexto = respuestasUsuario.find(
                    (respuesta) => respuesta.respuestatexto
                )?.respuestatexto;

                return {
                    pregunta: pregunta.pregunta,
                    tipopregunta: pregunta.tipopregunta,
                    opciones,
                    respuestatexto: respuestaTexto || null,
                };
            }
        );

        res.json({
            nombreformulario: formularioOriginal.nombreformulario,
            descripcion: formularioOriginal.descripcion,
            correoelectronico: formularioRespondido.usuario?.correoelectronico,
            fecharespuesta: formularioRespondido.fecharespuesta,
            resultados,
        });
    } catch (error) {
        console.error("Error al obtener los resultados del formulario:", error);
        res.status(500).json({
            error: "Hubo un error al obtener los resultados del formulario.",
        });
    }
};
