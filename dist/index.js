"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
server_1.default.listen(4000, "0.0.0.0", () => {
    console.log("Server running on http://0.0.0.0:4000");
});
//# sourceMappingURL=index.js.map