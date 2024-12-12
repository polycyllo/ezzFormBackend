import {
    Model,
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import Pregunta from "./Pregunta.model";
import Opcion from "./Opcion.model";
import FormularioRespondido from "./FormularioRespondido.model";

@Table({
    tableName: "respuestausuario",
    timestamps: false,
})
export default class RespuestaUsuario extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare codrespuesta: number;

    @ForeignKey(() => Pregunta)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare codpregunta: number;

    @ForeignKey(() => Opcion)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    declare idrespuesta: number;

    @ForeignKey(() => FormularioRespondido)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare codformulariorespondido: number;

    @BelongsTo(() => FormularioRespondido)
    declare formularioRespondido: FormularioRespondido;

    @Column({
        type: DataType.STRING(300),
        allowNull: true,
    })
    declare respuestatexto: string;
    @BelongsTo(() => Pregunta)
    declare pregunta: Pregunta;

    @BelongsTo(() => Opcion)
    declare opcion: Opcion;
}
