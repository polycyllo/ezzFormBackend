"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const formulario_1 = require("../handlers/formulario");
const express_validator_1 = require("express-validator");
const authWithRol_1 = require("../middleware/authWithRol");
const router = (0, express_1.Router)();
router.get("/usuarios/:codformulario", (0, express_validator_1.param)("codformulario").isInt().withMessage("id no valido"), auth_1.authenticate, (0, authWithRol_1.authenticateAndAuthorize)("user"), validation_1.handleInputErrors, formulario_1.getRespuestasPorRangoFechas);
router.get("/formulario/:token", auth_1.authenticate, (0, authWithRol_1.authenticateAndAuthorize)("user"), validation_1.handleInputErrors, formulario_1.getFormularioRespondidoByUser);
exports.default = router;
//# sourceMappingURL=respuestasRoutes.js.map