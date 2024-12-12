"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormularioRespondidoByUser = exports.getRespuestasPorRangoFechas = exports.getFormularioByToken = exports.responderForm = exports.deleteLinkForm = exports.getLinksForm = exports.createTokenForm = exports.deleteFormulario = exports.updateFormulario = exports.createFormulario = exports.getFormularioById = exports.getFormularios = void 0;
const uuid_1 = require("uuid");
const Formulario_model_1 = __importDefault(require("../models/Formulario.model"));
const Pregunta_model_1 = __importDefault(require("../models/Pregunta.model"));
const Opcion_model_1 = __importDefault(require("../models/Opcion.model"));
const FormularioToken_model_1 = __importDefault(require("../models/FormularioToken.model"));
const FormularioRespondido_model_1 = __importDefault(require("../models/FormularioRespondido.model"));
const RespuestaUsuario_1 = __importDefault(require("../models/RespuestaUsuario"));
const Usuario_model_1 = __importDefault(require("../models/Usuario.model"));
const sequelize_1 = require("sequelize");
const getFormularios = async (req, res) => {
    try {
        const formularios = await Formulario_model_1.default.findAll({
            where: {
                codusuario: req.user?.codusuario,
            },
            attributes: { exclude: ["codusuario"] },
        });
        res.json({ data: formularios });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getFormularios = getFormularios;
const getFormularioById = async (req, res) => {
    try {
        const { id } = req.params;
        const formulario = await Formulario_model_1.default.findByPk(id, {
            include: [
                {
                    model: Pregunta_model_1.default,
                    as: "preguntas",
                    include: [
                        {
                            model: Opcion_model_1.default,
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
        if (formulario.codusuario.toString() !== req.user?.codusuario.toString()) {
            return res.status(404).json({ error: "Accion no valida" });
        }
        res.json({ data: formulario });
    }
    catch (error) {
        console.error("Error al obtener el formulario con sus preguntas y opciones:", error);
        res.status(500).json({
            error: "Error al obtener el formulario con sus preguntas y opciones",
        });
    }
};
exports.getFormularioById = getFormularioById;
const createFormulario = async (req, res) => {
    const { nombreformulario, descripcion, preguntas } = req.body;
    try {
        const formulario = await Formulario_model_1.default.create({
            nombreformulario,
            descripcion,
            codusuario: req.user.codusuario,
        });
        for (const preguntaData of preguntas) {
            const pregunta = await Pregunta_model_1.default.create({
                pregunta: preguntaData.pregunta,
                tipopregunta: preguntaData.tipopregunta,
            });
            await formulario.$add("pregunta", pregunta);
            for (const opcionData of preguntaData.opciones) {
                await Opcion_model_1.default.create({
                    textoopcion: opcionData.textoopcion,
                    codpregunta: pregunta.codpregunta,
                    esrespuesta: opcionData.esrespuesta,
                });
            }
        }
        res.status(201).json({ data: formulario });
    }
    catch (error) {
        console.error("Error al crear el formulario:", error);
        res.status(500).json({ error: "Error al crear el formulario" });
    }
};
exports.createFormulario = createFormulario;
const updateFormulario = async (req, res) => {
    const { id } = req.params;
    const formulario = await Formulario_model_1.default.findByPk(id);
    if (!formulario) {
        return res.status(404).json({
            error: "el formulario no existe",
        });
    }
    await formulario.update(req.body);
    await formulario.save();
    res.json({ data: formulario });
};
exports.updateFormulario = updateFormulario;
const deleteFormulario = async (req, res) => {
    try {
        const { id } = req.params;
        const formulario = await Formulario_model_1.default.findByPk(id);
        if (!formulario) {
            return res.status(404).json({
                error: "El formulario no existe",
            });
        }
        const formsRespondidos = await FormularioRespondido_model_1.default.findAll({
            where: {
                codformulario: formulario.codformulario,
            },
        });
        for (const formRespondido of formsRespondidos) {
            await RespuestaUsuario_1.default.destroy({
                where: {
                    codformulariorespondido: formRespondido.codformulariorespondido,
                },
            });
        }
        await FormularioRespondido_model_1.default.destroy({
            where: {
                codformulario: formulario.codformulario,
            },
        });
        await FormularioToken_model_1.default.destroy({
            where: {
                codformulario: id,
            },
        });
        const preguntas = await Pregunta_model_1.default.findAll({
            where: {
                codformulario: id,
            },
        });
        for (const pregunta of preguntas) {
            await Opcion_model_1.default.destroy({
                where: {
                    codpregunta: pregunta.codpregunta,
                },
            });
        }
        await Pregunta_model_1.default.destroy({
            where: {
                codformulario: id,
            },
        });
        await formulario.destroy();
        return res.json({ message: "Formulario eliminado correctamente" });
    }
    catch (error) {
        console.error("Error al eliminar el formulario:", error);
        res.status(500).json({
            error: "Hubo un error al eliminar el formulario",
        });
    }
};
exports.deleteFormulario = deleteFormulario;
const createTokenForm = async (req, res) => {
    try {
        const { id } = req.params;
        const { fechainicio, fechafin } = req.body;
        const formulario = await Formulario_model_1.default.findByPk(id);
        if (!formulario) {
            return res.status(404).json({
                error: "El formulario no existe",
            });
        }
        const token = (0, uuid_1.v4)();
        const tokenRecord = await FormularioToken_model_1.default.create({
            codformulario: id,
            token,
            fechainicio,
            fechafin,
        });
        //await tokenRecord.save();
        const hostResponse = process.env.HOST_RESPONSE || `${req.protocol}://${req.get("host")}`;
        const link = `${hostResponse}/responder/${token}`;
        res.json({ link });
    }
    catch (error) {
        res.status(500).json({
            error: "Hubo un error al crear el link del formulario",
        });
    }
};
exports.createTokenForm = createTokenForm;
const getLinksForm = async (req, res) => {
    try {
        const { id } = req.params;
        const links = await FormularioToken_model_1.default.findAll({
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
        const hostResponse = process.env.HOST_RESPONSE || `${req.protocol}://${req.get("host")}`;
        const formattedLinks = links.map((link) => ({
            codformulariotoken: link.codformulariotoken,
            link: `${hostResponse}/responder/${link.token}`,
            fechainicio: link.fechainicio,
            fechafin: link.fechafin,
        }));
        res.json(formattedLinks);
    }
    catch (error) {
        console.error("Error al obtener enlaces:", error);
        res.status(500).json({ error: "Error al obtener los enlaces." });
    }
};
exports.getLinksForm = getLinksForm;
const deleteLinkForm = async (req, res) => {
    try {
        const { id } = req.params;
        const link = await FormularioToken_model_1.default.findByPk(id);
        if (!link) {
            return res.status(404).json({ error: "Enlace no encontrado." });
        }
        await link.destroy();
        res.json({ message: "Enlace eliminado correctamente." });
    }
    catch (error) {
        console.error("Error al eliminar el enlace:", error);
        res.status(500).json({ error: "Error al eliminar el enlace." });
    }
};
exports.deleteLinkForm = deleteLinkForm;
const responderForm = async (req, res) => {
    try {
        const { token } = req.params;
        const { respuestas, codusuario } = req.body;
        const tokenRecord = await FormularioToken_model_1.default.findOne({ where: { token } });
        if (!tokenRecord) {
            return res.status(404).json({ error: "El formulario no existe." });
        }
        const now = new Date();
        if (now < tokenRecord.fechainicio || now > tokenRecord.fechafin) {
            return res.status(403).json({
                error: "El formulario no está disponible para responder.",
            });
        }
        const tokenformulariousuario = (0, uuid_1.v4)();
        const formularioRespondido = await FormularioRespondido_model_1.default.create({
            codusuario,
            codformulario: tokenRecord.codformulario,
            fecharespuesta: now,
            tokenformulariousuario,
        });
        if (!formularioRespondido) {
            throw new Error("No se pudo crear el registro en formulariorespondido.");
        }
        for (const respuesta of respuestas) {
            try {
                const pregunta = await Pregunta_model_1.default.findOne({
                    where: { codpregunta: respuesta.codpregunta },
                });
                if (!pregunta) {
                    console.error(`Pregunta con código ${respuesta.codpregunta} no encontrada.`);
                    continue;
                }
                if (pregunta.tipopregunta === "circulo" ||
                    pregunta.tipopregunta === "cuadrado") {
                    if (Array.isArray(respuesta.respuestasSeleccionadas)) {
                        for (const idRespuesta of respuesta.respuestasSeleccionadas) {
                            await RespuestaUsuario_1.default.create({
                                codpregunta: respuesta.codpregunta,
                                idrespuesta: idRespuesta,
                                codformulariorespondido: formularioRespondido.codformulariorespondido,
                                respuestatexto: null,
                            });
                        }
                    }
                }
                else if (pregunta.tipopregunta === "texto" ||
                    pregunta.tipopregunta === "numeros" ||
                    pregunta.tipopregunta === "textoLibre") {
                    if (respuesta.respuestatexto) {
                        await RespuestaUsuario_1.default.create({
                            codpregunta: respuesta.codpregunta,
                            idrespuesta: null,
                            codformulariorespondido: formularioRespondido.codformulariorespondido,
                            respuestatexto: respuesta.respuestatexto,
                        });
                    }
                }
                else {
                    console.warn(`Tipo de pregunta desconocido: ${pregunta.tipopregunta}`);
                }
            }
            catch (error) {
                console.error(`Error al guardar respuesta para la pregunta ${respuesta.codpregunta}:`, error);
            }
        }
        res.status(200).json({
            message: "Respuestas registradas correctamente.",
        });
    }
    catch (error) {
        console.error("Error al registrar respuestas:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};
exports.responderForm = responderForm;
const getFormularioByToken = async (req, res) => {
    const { token } = req.params;
    try {
        const formularioToken = await FormularioToken_model_1.default.findOne({
            where: { token },
        });
        if (!formularioToken) {
            return res.status(404).json({
                error: "El formulario no existe o no está disponible.",
            });
        }
        const formulario = await Formulario_model_1.default.findOne({
            where: { codformulario: formularioToken.codformulario },
            include: [
                {
                    model: Pregunta_model_1.default,
                    include: [
                        {
                            model: Opcion_model_1.default,
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el formulario." });
    }
};
exports.getFormularioByToken = getFormularioByToken;
const getRespuestasPorRangoFechas = async (req, res) => {
    try {
        const { codformulario } = req.params;
        if (!codformulario) {
            return res
                .status(400)
                .json({ error: "El parámetro codformulario es obligatorio." });
        }
        // Obtener los rangos de fechas del formulario
        const rangosFechas = await FormularioToken_model_1.default.findAll({
            where: { codformulario },
            attributes: ["fechainicio", "fechafin"],
        });
        if (!rangosFechas || rangosFechas.length === 0) {
            return res.status(404).json({
                error: "No se encontraron rangos de fechas para este formulario.",
            });
        }
        // Obtener respuestas por rango de fechas y agregar información del usuario
        const respuestasPorRango = await Promise.all(rangosFechas.map(async (rango) => {
            const respuestas = await FormularioRespondido_model_1.default.findAll({
                where: {
                    codformulario,
                    fecharespuesta: {
                        [sequelize_1.Op.between]: [rango.fechainicio, rango.fechafin],
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
                        model: Usuario_model_1.default,
                        attributes: ["correoelectronico"],
                    },
                ],
            });
            const formattedRespuestas = respuestas.map((respuesta) => ({
                codformulariorespondido: respuesta.codformulariorespondido,
                tokenformulariousuario: respuesta.tokenformulariousuario,
                fecharespuesta: respuesta.fecharespuesta,
                correoelectronico: respuesta.usuario?.correoelectronico || null,
            }));
            return {
                fechainicio: rango.fechainicio,
                fechafin: rango.fechafin,
                respuestas: formattedRespuestas,
            };
        }));
        res.json(respuestasPorRango);
    }
    catch (error) {
        console.error("Error al obtener respuestas por rango de fechas:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};
exports.getRespuestasPorRangoFechas = getRespuestasPorRangoFechas;
const getFormularioRespondidoByUser = async (req, res) => {
    try {
        const { token } = req.params;
        const formularioRespondido = await FormularioRespondido_model_1.default.findOne({
            where: { tokenformulariousuario: token },
            include: [
                {
                    model: RespuestaUsuario_1.default,
                    attributes: [
                        "codpregunta",
                        "idrespuesta",
                        "respuestatexto",
                    ],
                },
                {
                    model: Usuario_model_1.default,
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
        const formularioOriginal = await Formulario_model_1.default.findByPk(formularioRespondido.codformulario, {
            include: [
                {
                    model: Pregunta_model_1.default,
                    as: "preguntas",
                    include: [
                        {
                            model: Opcion_model_1.default,
                            as: "opciones",
                        },
                    ],
                },
            ],
        });
        if (!formularioOriginal || !formularioOriginal.preguntas) {
            return res.status(404).json({
                error: "No se encontró el formulario original.",
            });
        }
        const resultados = formularioOriginal.preguntas.map((pregunta) => {
            const respuestasUsuario = formularioRespondido.respuestasUsuario.filter((resp) => resp.codpregunta === pregunta.codpregunta);
            const opciones = pregunta.opciones.map((opcion) => {
                const respuestaUsuario = respuestasUsuario.find((respuesta) => respuesta.idrespuesta === opcion.codrespuesta);
                return {
                    ...opcion.toJSON(),
                    esSeleccionada: Boolean(respuestaUsuario),
                };
            });
            const respuestaTexto = respuestasUsuario.find((respuesta) => respuesta.respuestatexto)?.respuestatexto;
            return {
                pregunta: pregunta.pregunta,
                tipopregunta: pregunta.tipopregunta,
                opciones,
                respuestatexto: respuestaTexto || null,
            };
        });
        res.json({
            nombreformulario: formularioOriginal.nombreformulario,
            descripcion: formularioOriginal.descripcion,
            correoelectronico: formularioRespondido.usuario?.correoelectronico,
            fecharespuesta: formularioRespondido.fecharespuesta,
            resultados,
        });
    }
    catch (error) {
        console.error("Error al obtener los resultados del formulario:", error);
        res.status(500).json({
            error: "Hubo un error al obtener los resultados del formulario.",
        });
    }
};
exports.getFormularioRespondidoByUser = getFormularioRespondidoByUser;
//# sourceMappingURL=formulario.js.map