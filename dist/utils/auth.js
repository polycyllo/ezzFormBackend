"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.hashContrasenia = void 0;
const argon2_1 = __importDefault(require("argon2"));
const hashContrasenia = async (contrasenia) => {
    return await argon2_1.default.hash(contrasenia);
};
exports.hashContrasenia = hashContrasenia;
const checkPassword = async (enteredPassword, storedHash) => {
    return await argon2_1.default.verify(storedHash, enteredPassword);
};
exports.checkPassword = checkPassword;
//# sourceMappingURL=auth.js.map