"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const server_1 = __importDefault(require("./server"));
const key = fs_1.default.readFileSync("src/config/certs/key.pem");
const cert = fs_1.default.readFileSync("src/config/certs/cert.pem");
// server.listen(4000, "0.0.0.0", () => {
//     console.log("Server running on http://0.0.0.0:4000");
// });
https_1.default.createServer({ key, cert }, server_1.default).listen(4000, "0.0.0.0", () => {
    console.log("Servidor HTTPS corriendo en https://localhost:4000");
});
//# sourceMappingURL=index.js.map