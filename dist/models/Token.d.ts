import { Model } from "sequelize-typescript";
import Usuario from "./Usuario.model";
declare class Token extends Model {
    token: string;
    iduser: number;
    user: Usuario;
    fechacreacion: Date;
    expiresat: Date;
}
export default Token;
