import { Model } from "sequelize-typescript";
declare class Rol extends Model {
    codrol: number;
    codusuario: number;
    nombrerol: string;
}
export default Rol;
