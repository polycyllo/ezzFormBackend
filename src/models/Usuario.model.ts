import {
    Table,
    Column,
    Model,
    DataType,
    Default,
    HasMany,
    PrimaryKey,
    AutoIncrement,
    Unique,
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

    @Unique
    @Column({
        type: DataType.STRING(40),
        allowNull: false,
    })
    declare correoelectronico: string;

    @Default(DataType.NOW)
    @Column({
        type: DataType.DATE,
    })
    declare fechadecreaciondecuenta: Date;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    declare contrasenia: string;

    @Default(false)
    @Column({
        type: DataType.BOOLEAN(),
    })
    declare confirmado: boolean;
    @HasMany(() => Formulario)
    declare formularios: Formulario[];
}

export default Usuario;
