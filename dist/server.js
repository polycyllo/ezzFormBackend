"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router_1 = __importDefault(require("./routes/Router"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const respuestasRoutes_1 = __importDefault(require("./routes/respuestasRoutes"));
const linkRoutes_1 = __importDefault(require("./routes/linkRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//conectar a bd
async function connectDB() {
    try {
        await db_1.default.authenticate();
        db_1.default.sync();
        console.log("conexion exitosa");
    }
    catch (error) {
        console.log(error);
        console.log("Hubo un error al conectar a la BD");
    }
}
connectDB();
const server = (0, express_1.default)();
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin ||
            origin === "http://localhost:5173" ||
            origin === "http://26.156.22.45:5173") {
            callback(null, true);
        }
        else {
            callback(new Error("Origen no permitido por CORS"));
        }
    },
    credentials: true,
};
server.use((0, cors_1.default)(corsOptions));
server.use((0, cookie_parser_1.default)());
server.use((0, morgan_1.default)("dev"));
server.use(express_1.default.json());
server.use("/api/admin", adminRoutes_1.default);
server.use("/api", Router_1.default);
server.use("/api/auth", authRoutes_1.default);
server.use("/api", linkRoutes_1.default);
server.use("/api/respuestas", respuestasRoutes_1.default);
exports.default = server;
//# sourceMappingURL=server.js.map