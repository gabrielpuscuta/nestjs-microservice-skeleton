import {
    Table, Column, Model, PrimaryKey, DataType,
    BelongsTo
} from 'sequelize-typescript';

@Table({
    tableName: "user"
})
export class User extends Model {

    @PrimaryKey
    @Column({
        type: DataType.UUID
    })
    id: string

    @Column({
        type: DataType.STRING(155),
        allowNull: false
    })
    realm: string

    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    clientId: string
    
}  