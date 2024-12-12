import { Request, Response, NextFunction } from "express";
import Usuario from "../models/Usuario.model";
declare global {
    namespace Express {
        interface Request {
            user?: Usuario;
        }
    }
}
export declare const authenticateAndAuthorize: (requiredRole?: string) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
