import { Router } from "express";
import { body, param } from "express-validator";
import {
    createFormulario,
    getFormularios,
    getFormularioById,
    updateFormulario,
    deleteFormulario,
} from "./handlers/formulario";
import { handleInputErrors } from "./middleware";
import {
    createPregunta,
    getPreguntaById,
    getPreguntas,
} from "./handlers/pregunta";
import { createUsuario, getUsuarioById } from "./handlers/usuario";
const router = Router();
const usuarioRouter = Router();

usuarioRouter.post(
    "/",
    body("nombre").notEmpty().withMessage("El nombre no puede ir vacio"),
    body("apellido").notEmpty().withMessage("el apellido no puede ir vacio"),
    handleInputErrors,
    createUsuario
);
usuarioRouter.get(
    "/:id",
    param("id").isInt().withMessage("id no valido"),
    handleInputErrors,
    getUsuarioById
);
const formularioRouter = Router();

formularioRouter.get("/", getFormularios);

formularioRouter.get(
    "/:id",
    param("id").isInt().withMessage("id no valido"),
    handleInputErrors,
    getFormularioById
);

formularioRouter.post(
    "/",
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
router.use("/usuario", usuarioRouter);
export default router;
