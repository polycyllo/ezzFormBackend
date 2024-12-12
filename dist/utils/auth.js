"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.hashContrasenia = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashContrasenia = async (contrasenia) => {
    const salt = await bcrypt_1.default.genSalt(10);
    return await bcrypt_1.default.hash(contrasenia, salt);
};
exports.hashContrasenia = hashContrasenia;
const checkPassword = async (enteredPassword, storeHash) => {
    return await bcrypt_1.default.compare(enteredPassword, storeHash);
};
exports.checkPassword = checkPassword;
//# sourceMappingURL=auth.js.map