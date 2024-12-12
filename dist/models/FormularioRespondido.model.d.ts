import { Model } from "sequelize-typescript";
import Usuario from "./Usuario.model";
import RespuestaUsuario from "./RespuestaUsuario";
export default class FormularioRespondido extends Model {
    codformulariorespondido: number;
    codusuario: number;
    codformulario: number;
    usuario: Usuario;
    fecharespuesta: Date;
    tokenformulariousuario: string;
    respuestasUsuario: RespuestaUsuario[];
}
