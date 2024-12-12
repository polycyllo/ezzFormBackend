import { Model } from "sequelize-typescript";
import Pregunta from "./Pregunta.model";
import Usuario from "./Usuario.model";
declare class Formulario extends Model {
    codformulario: number;
    codusuario: number;
    usuario: Usuario;
    nombreformulario: string;
    descripcion: string;
    activo: boolean;
    preguntas: Pregunta[];
}
export default Formulario;
