import {
    Table,
    Column,
    Model,
    DataType,
    Default,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import Usuario from "./Usuario.model";

@Table({
    tableName: "token",
    timestamps: false,
})
class Token extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare token: string;

    @ForeignKey(() => Usuario)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare iduser: number;

    @BelongsTo(() => Usuario)
    declare user: Usuario;

    @Default(DataType.NOW)
    @Column({
        type: DataType.DATE,
    })
    declare fechacreacion: Date;

    @Default(() => new Date(Date.now() + 10 * 60 * 1000))
    @Column({
        type: DataType.DATE,
    })
    declare expiresat: Date;
}

export default Token;
