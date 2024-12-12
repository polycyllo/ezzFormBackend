"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthEmail = void 0;
const nodemaller_1 = require("../config/nodemaller");
class AuthEmail {
    static sendConfirmationEmail = async (usuario) => {
        const info = await nodemaller_1.transporter.sendMail({
            from: "ezzForm <Admin@ezzForm.com>",
            to: usuario.correoelectronico,
            subject: "ezzForm - confirma tu cuenta",
            text: "ezzForm - confirma tu cuenta",
            html: `<p>Hola: ${usuario.name}, has creado tu cuenta en ezzForm, ya casi esta todo listo, por favor debes confirmar tu cuenta</p>
            <p>Visita el siguiente enlace:</p>
            <a href="${process.env.frontend}/auth/confirm-account">Confirma cuenta</a>
            <p>E ingresa el siguiente codigo: <b>${usuario.token}</b></p>    
            <p>Este token expira en 10 minutos</p>
            `,
        });
        console.log("Mensaje enviado", info.messageId);
    };
}
exports.AuthEmail = AuthEmail;
//# sourceMappingURL=AuthEmail.js.map