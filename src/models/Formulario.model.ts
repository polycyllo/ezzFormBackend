import {
    Table,
    Column,
    Model,
    DataType,
    Default,
    HasMany,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import Pregunta from "./Pregunta.model";
import Usuario from "./Usuario.model";

@Table({
    tableName: "formulario",
    timestamps: false,
})
class Formulario extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare codformulario: number;

    @ForeignKey(() => Usuario)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare codusuario: number;
    @BelongsTo(() => Usuario)
    declare usuario: Usuario;

    @Column({
        type: DataType.STRING(500),
    })
    declare nombreformulario: string;

    @Column({
        type: DataType.STRING(1000),
    })
    declare descripcion: string;

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
    })
    declare activo: boolean;

    @HasMany(() => Pregunta)
    declare preguntas: Pregunta[];
}

export default Formulario;
