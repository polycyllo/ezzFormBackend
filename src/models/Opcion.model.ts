import { Table, Column, Model, DataType, Default, ForeignKey,BelongsTo } from 'sequelize-typescript'
import Pregunta from './Pregunta.model'
@Table({
    tableName : 'opcion',
    timestamps: false
})
class Opcion extends Model {
    @Column({
        type: DataType.NUMBER,
        primaryKey: true,
        autoIncrement: true
    })
    declare codrespuesta: number

    @ForeignKey(() => Pregunta)
    @Column({
        type: DataType.NUMBER        
    })
    declare codpregunta: number

    @Column({
        type: DataType.STRING(300)        
    })
    declare textoopcion: string

    @Default(false)
    @Column({
        type: DataType.BOOLEAN
    })
    declare esrespuesta: boolean

}

export default Opcion