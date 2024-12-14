import express from "express";
import router from "./routes/Router";
import adminRoutes from "./routes/adminRoutes";
import db from "./config/db";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";
import respuestasRoutes from "./routes/respuestasRoutes";
import linkRoutes from "./routes/linkRoutes";
import cookiePaser from "cookie-parser";
//conectar a bd
async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log("conexion exitosa");
    } catch (error) {
        console.log(error);
        console.log("Hubo un error al conectar a la BD");
    }
}

connectDB();

const server = express();
const corsOptions: CorsOptions = {
    origin: [
        "https://proyecto-programacion-web-kappa.vercel.app",
        "http://localhost:5173", // Para pruebas locales.
    ],
    credentials: true, // Permite enviar cookies.
};
server.use(cors(corsOptions));
server.use(cors(corsOptions));
server.use(cookiePaser());
server.use(morgan("dev"));
server.use(express.json());
server.use("/api/admin", adminRoutes);
server.use("/api", router);
server.use("/api/auth", authRoutes);
server.use("/api", linkRoutes);
server.use("/api/respuestas", respuestasRoutes);
export default server;
