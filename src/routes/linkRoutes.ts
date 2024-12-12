import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";
import {
    deleteLinkForm,
    getFormularioByToken,
    getLinksForm,
    responderForm,
} from "../handlers/formulario";
import { authenticateAndAuthorize } from "../middleware/authWithRol";

const router = Router();
router.get(
    "/:id/links",
    authenticate,
    authenticateAndAuthorize("user"),
    param("id").isInt().withMessage("El ID del formulario debe ser un número."),
    handleInputErrors,
    getLinksForm
);
router.delete(
    "/:id/delete",
    authenticate,
    authenticateAndAuthorize("user"),
    param("id").isInt().withMessage("El ID del token debe ser un número."),
    handleInputErrors,
    deleteLinkForm
);
router.post(
    "/responder/:token",
    authenticate,
    authenticateAndAuthorize("user"),
    handleInputErrors,
    responderForm
);

router.get(
    "/:token",
    authenticate,
    authenticateAndAuthorize("user"),
    handleInputErrors,
    getFormularioByToken
);

router.use("/linkform", router);
export default router;
