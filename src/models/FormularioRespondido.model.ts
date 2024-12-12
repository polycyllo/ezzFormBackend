import {
    Model,
    Table,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
} from "sequelize-typescript";
import Usuario from "./Usuario.model";
import Formulario from "./Formulario.model";
import RespuestaUsuario from "./RespuestaUsuario";

@Table({
    tableName: "formulariorespondido",
    timestamps: false,
})
export default class FormularioRespondido extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare codformulariorespondido: number;

    @ForeignKey(() => Usuario)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare codusuario: number;

    @ForeignKey(() => Formulario)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare codformulario: number;
    @BelongsTo(() => Usuario)
    declare usuario: Usuario;
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
        allowNull: false,
    })
    declare fecharespuesta: Date;

    @Column({
        type: DataType.STRING(100),
    })
    declare tokenformulariousuario: string;

    @HasMany(() => RespuestaUsuario)
    declare respuestasUsuario: RespuestaUsuario[];
}
