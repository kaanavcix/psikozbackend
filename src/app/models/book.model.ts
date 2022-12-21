import { Table, Model, DataType, Column, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';




@Table({
  tableName:"book",
  timestamps:false
  
})
export class Book extends Model {



  @Column({ primaryKey: true, autoIncrement: true, allowNull: false, type: DataType.INTEGER })
  id?: number;
  @Column({ type: DataType.STRING, allowNull:true})
  title?: string;
  @Column({ type: DataType.STRING, allowNull:true})
  content?: string;
  @Column({ type: DataType.STRING, allowNull:true})
  summary?: string;
  @Column({ type: DataType.BLOB, allowNull:true})
  image: any;
  @Column({ type: DataType.STRING, allowNull:true})
  createdAt?: any;


}


class BookModel extends Model {

 
  title?: string;
  content?: string;
  summary?: string;
}

