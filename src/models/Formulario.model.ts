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

    // Relacionar el formulario con el usuario
    @ForeignKey(() => Usuario)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare codusuario: number;

    // Relación con el modelo Usuario para tener acceso a los datos del usuario
    @BelongsTo(() => Usuario)
    declare usuario: Usuario;

    @Column({
        type: DataType.STRING(100),
    })
    declare nombreformulario: string;

    @Column({
        type: DataType.STRING(500),
    })
    declare descripcion: string;

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
    })
    declare activo: boolean;

    // Relación 1:N con el modelo Pregunta
    @HasMany(() => Pregunta)
    declare preguntas: Pregunta[];
}

export default Formulario;
