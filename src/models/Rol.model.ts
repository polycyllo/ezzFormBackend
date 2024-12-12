import {
    Table,
    Column,
    Model,
    DataType,
    Default,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
    AutoIncrement,
} from "sequelize-typescript";
import Usuario from "./Usuario.model";

@Table({
    tableName: "rol",
    timestamps: false,
})
class Rol extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare codrol: number;

    @ForeignKey(() => Usuario)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare codusuario: number;

    @Column({
        type: DataType.STRING(30),
        allowNull: false,
    })
    declare nombrerol: string;
}

export default Rol;
