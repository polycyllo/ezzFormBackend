import {
    Table,
    Column,
    Model,
    DataType,
    Default,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import Usuario from "./Usuario.model"; // Importa el modelo de Usuario para la relación

@Table({
    tableName: "token",
    timestamps: false, // Desactivamos el manejo de timestamps automáticos de Sequelize
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

    @Default(DataType.NOW) // Para definir una fecha de creación predeterminada
    @Column({
        type: DataType.DATE,
    })
    declare fechacreacion: Date;

    @Default(() => new Date(Date.now() + 10 * 60 * 1000)) // Añade una expiración de 1 día
    @Column({
        type: DataType.DATE,
    })
    declare expiresat: Date;
}

export default Token;
