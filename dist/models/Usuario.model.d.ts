import { Model } from "sequelize-typescript";
import Formulario from "./Formulario.model";
import FormularioRespondido from "./FormularioRespondido.model";
import Rol from "./Rol.model";
declare class Usuario extends Model {
    codusuario: number;
    nombre: string;
    apellido: string;
    correoelectronico: string;
    fechadecreaciondecuenta: Date;
    contrasenia: string;
    confirmado: boolean;
    formularios: Formulario[];
    formularioRespondido: FormularioRespondido[];
    roles: Rol[];
}
export default Usuario;
