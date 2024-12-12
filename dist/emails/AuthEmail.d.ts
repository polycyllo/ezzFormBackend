type IEmail = {
    correoelectronico: string;
    name: string;
    token: string;
};
export declare class AuthEmail {
    static sendConfirmationEmail: (usuario: IEmail) => Promise<void>;
}
export {};
