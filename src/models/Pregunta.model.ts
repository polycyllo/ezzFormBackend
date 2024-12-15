import {
    Table,
    Column,
    Model,
    DataType,
    Default,
    ForeignKey,
    HasMany,
} from "sequelize-typescript";
import Formulario from "./Formulario.model";
import Opcion from "./Opcion.model";
import RespuestaUsuario from "./RespuestaUsuario";
@Table({
    tableName: "pregunta",
    timestamps: false,
})
class Pregunta extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare codpregunta: number;

    @ForeignKey(() => Formulario)
    @Column({
        type: DataType.INTEGER,
    })
    declare codformulario: number;

    @Column({
        type: DataType.STRING(1000),
    })
    declare pregunta: string;

    @Column({
        type: DataType.STRING(100),
    })
    declare tipopregunta: string;

    @HasMany(() => Opcion)
    declare opciones: Opcion[];

    @HasMany(() => RespuestaUsuario)
    declare respuestasusuarios: RespuestaUsuario[];
}

export default Pregunta;
