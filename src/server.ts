import express from "express";
import router from "./routes/Router";
import db from "./config/db";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";
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
    origin: function (origin, callback) {
        if (!origin || origin === "http://localhost:5173") {
            callback(null, true);
        } else {
            callback(new Error("Origen no permitido por CORS"));
        }
    },
    credentials: true,
};

server.use(cors(corsOptions));
server.use(cookiePaser());
server.use(morgan("dev"));
server.use(express.json());
server.use("/api", router);
server.use("/api/auth", authRoutes);

export default server;
