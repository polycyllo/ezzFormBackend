import { Model } from "sequelize-typescript";
import RespuestaUsuario from "./RespuestaUsuario";
declare class Opcion extends Model {
    codrespuesta: number;
    codpregunta: number;
    textoopcion: string;
    esrespuesta: boolean;
    respuestasusuarios: RespuestaUsuario[];
}
export default Opcion;
