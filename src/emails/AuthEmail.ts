import { transporter } from "../config/nodemaller";
type IEmail = {
    correoelectronico: string;
    name: string;
    token: string;
};
export class AuthEmail {
    static sendConfirmationEmail = async (usuario: IEmail) => {
        const info = await transporter.sendMail({
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
