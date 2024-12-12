"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validation_1 = require("../middleware/validation");
const auth_1 = require("../middleware/auth");
const formulario_1 = require("../handlers/formulario");
const authWithRol_1 = require("../middleware/authWithRol");
const router = (0, express_1.Router)();
router.get("/:id/links", auth_1.authenticate, (0, authWithRol_1.authenticateAndAuthorize)("user"), (0, express_validator_1.param)("id").isInt().withMessage("El ID del formulario debe ser un número."), validation_1.handleInputErrors, formulario_1.getLinksForm);
router.delete("/:id/delete", auth_1.authenticate, (0, authWithRol_1.authenticateAndAuthorize)("user"), (0, express_validator_1.param)("id").isInt().withMessage("El ID del token debe ser un número."), validation_1.handleInputErrors, formulario_1.deleteLinkForm);
router.post("/responder/:token", auth_1.authenticate, (0, authWithRol_1.authenticateAndAuthorize)("user"), validation_1.handleInputErrors, formulario_1.responderForm);
router.get("/:token", auth_1.authenticate, (0, authWithRol_1.authenticateAndAuthorize)("user"), validation_1.handleInputErrors, formulario_1.getFormularioByToken);
router.use("/linkform", router);
exports.default = router;
//# sourceMappingURL=linkRoutes.js.map