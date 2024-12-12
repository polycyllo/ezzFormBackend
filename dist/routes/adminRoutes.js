"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const authWithRol_1 = require("../middleware/authWithRol");
const usuario_1 = require("../handlers/usuario");
const router = (0, express_1.Router)();
router.get("/", auth_1.authenticate, (0, authWithRol_1.authenticateAndAuthorize)("admin"), usuario_1.getAllUsers);
router.use("", router);
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map