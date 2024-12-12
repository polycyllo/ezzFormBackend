import { Model } from "sequelize-typescript";
import Formulario from "./Formulario.model";
declare class FormularioToken extends Model {
    codformulariotoken: number;
    codformulario: number;
    formulario: Formulario;
    token: string;
    fechainicio: Date;
    fechafin: Date;
    creado: Date;
}
export default FormularioToken;
