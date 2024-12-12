import { Router } from "express";
import { authenticate } from "../middleware/auth";
import { authenticateAndAuthorize } from "../middleware/authWithRol";
import { getAllUsers } from "../handlers/usuario";
const router = Router();
router.get("/", authenticate, authenticateAndAuthorize("admin"), getAllUsers);
router.use("", router);
export default router;
