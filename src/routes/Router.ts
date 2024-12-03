import { Router } from "express";
import { body, param } from "express-validator";
import {
    createFormulario,
    getFormularios,
    getFormularioById,
    updateFormulario,
    deleteFormulario,
} from "../handlers/formulario";
import { handleInputErrors } from "../middleware/validation";
import {
    createPregunta,
    getPreguntaById,
    getPreguntas,
} from "../handlers/pregunta";
import { createUsuario, getUsuarioById } from "../handlers/usuario";
import { authenticate } from "../middleware/auth";
const router = Router();
const formularioRouter = Router();

formularioRouter.get("/", authenticate, getFormularios);

formularioRouter.get(
    "/:id",
    authenticate,
    param("id").isInt().withMessage("id no valido"),
    handleInputErrors,
    getFormularioById
);

formularioRouter.post(
    "/",
    authenticate,
    body("nombreformulario")
        .notEmpty()
        .withMessage("El nombre del form no puede ir vacio"),
    body("descripcion")
        .notEmpty()
        .withMessage("La descripcion del form no puede ir vacio"),
    handleInputErrors,
    createFormulario
);

formularioRouter.put(
    "/:id",
    param("id").isInt().withMessage("id no valido"),
    body("nombreformulario")
        .notEmpty()
        .withMessage("el nombre del form no puede ir vacio"),
    body("descripcion")
        .notEmpty()
        .withMessage("la descripcion no puede ir vacia"),
    handleInputErrors,
    updateFormulario
);
formularioRouter.patch("/", (req, res) => {
    res.json("es un PATCH");
});

formularioRouter.delete(
    "/:id",
    authenticate,
    param("id").isInt().withMessage("id no valido"),
    handleInputErrors,
    deleteFormulario
);

const preguntaRouter = Router();
preguntaRouter.post(
    "/",
    body("pregunta").notEmpty().withMessage("La pregunta no puede ir vacia"),
    body("tipopregunta")
        .notEmpty()
        .withMessage("El tipo pregunta no puede ir vacio"),
    handleInputErrors,
    createPregunta
);

preguntaRouter.get("/", getPreguntas);
preguntaRouter.get(
    "/:id",
    param("id").isInt().withMessage("id no valido"),
    handleInputErrors,
    getPreguntaById
);

router.use("/formulario", formularioRouter);
router.use("/pregunta", preguntaRouter);
export default router;
