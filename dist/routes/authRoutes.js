"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const express_validator_1 = require("express-validator");
const validation_1 = require("../middleware/validation");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/create-account", (0, express_validator_1.body)("nombre").notEmpty().withMessage("El nombre no puede ir vacio"), (0, express_validator_1.body)("apellido").notEmpty().withMessage("el apellido no puede ir vacio"), (0, express_validator_1.body)("correoelectronico").isEmail().withMessage("correo no valido"), (0, express_validator_1.body)("contrasenia")
    .isLength({ min: 8 })
    .withMessage("el password es muy corto, minimo 8 caracteres"), (0, express_validator_1.body)("contrasenia_confirmada").custom((value, { req }) => {
    if (value !== req.body.contrasenia) {
        throw new Error("Las constrañas no son iguales");
    }
    return true;
}), validation_1.handleInputErrors, AuthController_1.AuthController.createAccount);
router.post("/confirm-account", (0, express_validator_1.body)("token").notEmpty().withMessage("El token no puede ir vacio"), validation_1.handleInputErrors, AuthController_1.AuthController.confirmAccount);
router.post("/login", (0, express_validator_1.body)("correoelectronico").isEmail().withMessage("correo no valido"), (0, express_validator_1.body)("contrasenia")
    .notEmpty()
    .withMessage("El password no puede estar vacio"), validation_1.handleInputErrors, AuthController_1.AuthController.login);
router.post("/request-code", (0, express_validator_1.body)("correoelectronico").isEmail().withMessage("correo no valido"), validation_1.handleInputErrors, AuthController_1.AuthController.requestConfirmationToken);
router.get("/user", auth_1.authenticate, AuthController_1.AuthController.getUsuario);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map