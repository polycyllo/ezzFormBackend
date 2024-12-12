import type { Request, Response } from "express";
export declare class AuthController {
    static createAccount: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static confirmAccount: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static requestConfirmationToken: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static getUsuario: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
