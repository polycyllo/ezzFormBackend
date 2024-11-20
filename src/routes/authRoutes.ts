import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";

const router = Router();

router.post(
    "/create-account",
    body("nombre").notEmpty().withMessage("El nombre no puede ir vacio"),
    body("apellido").notEmpty().withMessage("el apellido no puede ir vacio"),
    body("correoelectronico").isEmail().withMessage("correo no valido"),
    body("contrasenia")
        .isLength({ min: 8 })
        .withMessage("el password es muy corto, minimo 8 caracteres"),
    body("contrasenia_confirmada").custom((value, { req }) => {
        if (value !== req.body.contrasenia) {
            throw new Error("Las constrañas no son iguales");
        }
        return true;
    }),
    handleInputErrors,
    AuthController.createAccount
);
router.get(
    "/:id",
    param("id").isInt().withMessage("id no valido"),
    handleInputErrors
);
export default router;
