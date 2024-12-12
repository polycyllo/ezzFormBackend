import { Model } from "sequelize-typescript";
import Pregunta from "./Pregunta.model";
import Opcion from "./Opcion.model";
import FormularioRespondido from "./FormularioRespondido.model";
export default class RespuestaUsuario extends Model {
    codrespuesta: number;
    codpregunta: number;
    idrespuesta: number;
    codformulariorespondido: number;
    formularioRespondido: FormularioRespondido;
    respuestatexto: string;
    pregunta: Pregunta;
    opcion: Opcion;
}
