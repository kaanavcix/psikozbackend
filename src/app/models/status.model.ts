import { Table, Model, DataType, Column, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
@Table({
  tableName: "status"
  , timestamps: false
})


export class Status extends Model {

  @Column({
    type: DataType.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true
  })
  id?: number;
  @Column({ type: DataType.STRING, allowNull: false })
  name?: string;

}