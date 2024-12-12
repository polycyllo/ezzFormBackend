import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import Formulario from "./Formulario.model";

@Table({
    tableName: "formulariotoken",
    timestamps: false,
})
class FormularioToken extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare codformulariotoken: number;

    @ForeignKey(() => Formulario)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare codformulario: number;

    @BelongsTo(() => Formulario)
    declare formulario: Formulario;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        unique: true,
    })
    declare token: string;

    @Column({
        type: DataType.DATE,
        allowNull: true,
        defaultValue: DataType.NOW,
    })
    declare fechainicio: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    declare fechafin: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    declare creado: Date;
}

export default FormularioToken;
