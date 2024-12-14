"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const formulario_1 = require("../handlers/formulario");
const validation_1 = require("../middleware/validation");
const auth_1 = require("../middleware/auth");
const authWithRol_1 = require("../middleware/authWithRol");
const router = (0, express_1.Router)();
const formularioRouter = (0, express_1.Router)();
formularioRouter.get("/", auth_1.authenticate, (0, authWithRol_1.authenticateAndAuthorize)("user"), formulario_1.getFormularios);
formularioRouter.get("/:id", auth_1.authenticate, (0, authWithRol_1.authenticateAndAuthorize)("user"), (0, express_validator_1.param)("id").isInt().withMessage("id no valido"), validation_1.handleInputErrors, formulario_1.getFormularioById);
formularioRouter.post("/", auth_1.authenticate, (0, authWithRol_1.authenticateAndAuthorize)("user"), (0, express_validator_1.body)("nombreformulario")
    .notEmpty()
    .withMessage("El nombre del form no puede ir vacio"), (0, express_validator_1.body)("descripcion")
    .notEmpty()
    .withMessage("La descripcion del form no puede ir vacio"), validation_1.handleInputErrors, formulario_1.createFormulario);
formularioRouter.post("/:id/compartir", auth_1.authenticate, (0, authWithRol_1.authenticateAndAuthorize)("user"), (0, express_validator_1.param)("id").isInt().withMessage("El ID del formulario debe ser un entero"), validation_1.handleInputErrors, formulario_1.createTokenForm);
formularioRouter.delete("/:id", auth_1.authenticate, (0, authWithRol_1.authenticateAndAuthorize)("user"), (0, express_validator_1.param)("id").isInt().withMessage("id no valido"), validation_1.handleInputErrors, formulario_1.deleteFormulario);
router.use("/formulario", formularioRouter);
exports.default = router;
//# sourceMappingURL=Router.js.map