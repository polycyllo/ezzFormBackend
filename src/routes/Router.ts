import { Router } from "express";
import { body, param } from "express-validator";
import {
    createFormulario,
    getFormularios,
    getFormularioById,
    updateFormulario,
    deleteFormulario,
    createTokenForm,
    getLinksForm,
} from "../handlers/formulario";
import { handleInputErrors } from "../middleware/validation";

import { authenticate } from "../middleware/auth";
import { authenticateAndAuthorize } from "../middleware/authWithRol";
const router = Router();
const formularioRouter = Router();

formularioRouter.get(
    "/",
    authenticate,
    authenticateAndAuthorize("user"),
    getFormularios
);

formularioRouter.get(
    "/:id",
    authenticate,
    authenticateAndAuthorize("user"),
    param("id").isInt().withMessage("id no valido"),
    handleInputErrors,
    getFormularioById
);

formularioRouter.post(
    "/",
    authenticate,
    authenticateAndAuthorize("user"),
    body("nombreformulario")
        .notEmpty()
        .withMessage("El nombre del form no puede ir vacio"),
    body("descripcion")
        .notEmpty()
        .withMessage("La descripcion del form no puede ir vacio"),
    handleInputErrors,
    createFormulario
);

formularioRouter.post(
    "/:id/compartir",
    authenticate,
    authenticateAndAuthorize("user"),
    param("id").isInt().withMessage("El ID del formulario debe ser un entero"),
    handleInputErrors,
    createTokenForm
);

formularioRouter.delete(
    "/:id",
    authenticate,
    authenticateAndAuthorize("user"),
    param("id").isInt().withMessage("id no valido"),
    handleInputErrors,
    deleteFormulario
);

router.use("/formulario", formularioRouter);

export default router;
