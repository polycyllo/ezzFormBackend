import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { handleInputErrors } from "../middleware/validation";
import {
    getFormularioRespondidoByUser,
    getRespuestasPorRangoFechas,
} from "../handlers/formulario";
import { param } from "express-validator";
import { authenticateAndAuthorize } from "../middleware/authWithRol";

const router = Router();
router.get(
    "/usuarios/:codformulario",
    param("codformulario").isInt().withMessage("id no valido"),
    authenticate,
    authenticateAndAuthorize("user"),
    handleInputErrors,
    getRespuestasPorRangoFechas
);

router.get(
    "/formulario/:token",
    authenticate,
    authenticateAndAuthorize("user"),
    handleInputErrors,
    getFormularioRespondidoByUser
);
export default router;
