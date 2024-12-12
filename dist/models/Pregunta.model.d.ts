import { Model } from "sequelize-typescript";
import Opcion from "./Opcion.model";
import RespuestaUsuario from "./RespuestaUsuario";
declare class Pregunta extends Model {
    codpregunta: number;
    codformulario: number;
    pregunta: string;
    tipopregunta: string;
    opciones: Opcion[];
    respuestasusuarios: RespuestaUsuario[];
}
export default Pregunta;
