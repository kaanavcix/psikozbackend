import { Model, DataType, Table, Column, ForeignKey, BelongsTo, HasOne, HasMany } from 'sequelize-typescript';




@Table({
   tableName:"article"
   ,timestamps:false
})

export class Article extends Model{
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false, type: DataType.INTEGER })
  id?: number;
  @Column({ type: DataType.STRING, allowNull:true})
  title?: string;
  @Column({ type: DataType.STRING, allowNull:true})
  content?: string;
  @Column({ type: DataType.STRING, allowNull:true})
  image_path?: string;
  @Column({ type: DataType.STRING, allowNull:true})
  writer?: string
  @Column({ type: DataType.STRING, allowNull:true})
  created_at?: any;

  @Column({type:DataType.INTEGER, allowNull:true})
  category_id?: number;
}


@Table({
  tableName:"categoryarticle"
  ,timestamps:false
})
export class CategoryArticle extends Model{
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false, type: DataType.INTEGER })
  id?: number;
  @Column({type:DataType.STRING})
  name?:CategoryArticle;



}
