import { Table, Model, DataType, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserModel } from './patient.model';


@Table({
    tableName: 'post',
  timestamps:false,
})
export class Post extends Model {

  @Column({autoIncrement:true,primaryKey:true,})
  postid?: number;
  @ForeignKey(()=>UserModel)
  userid?: number;
  @BelongsTo(()=>UserModel)
  user?: UserModel;
  @Column({allowNull:true,type: DataType.STRING,})
  categoryname?: string;
  @Column({allowNull:false ,type: DataType.STRING,})
  content?: string;
  @Column({allowNull:true,type: DataType.BOOLEAN,})
  isanonim?:boolean;

  
  

  
}


//bu model doğru mu bilmiyorum