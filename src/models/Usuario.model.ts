import {
    Table,
    Column,
    Model,
    DataType,
    Default,
    HasMany,
    PrimaryKey,
    AutoIncrement,
} from "sequelize-typescript";
import Formulario from "./Formulario.model";

@Table({
    tableName: "usuario",
    timestamps: false,
})
class Usuario extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare codusuario: number;

    @Column({
        type: DataType.STRING(30),
        allowNull: false,
    })
    declare nombre: string;

    @Column({
        type: DataType.STRING(30),
        allowNull: false,
    })
    declare apellido: string;

    @Column({
        type: DataType.STRING(40),
        allowNull: false,
    })
    declare correoelectronico: string;

    @Default(DataType.NOW) // Si quieres una fecha por defecto al crear
    @Column({
        type: DataType.DATE,
    })
    declare fechadecreaciondecuenta: Date;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    declare contrasenia: string;

    @HasMany(() => Formulario)
    declare formularios: Formulario[];
}

export default Usuario;
