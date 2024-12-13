"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const PORT = process.env.PORT || 4000;
server_1.default.listen(PORT, "0.0.0.0", () => {
    console.log(`aquiiiiiiiii Server running on http://0.0.0.0:${PORT}`);
});
//# sourceMappingURL=index.js.map