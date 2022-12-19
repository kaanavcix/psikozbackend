import {Comment} from './comment.model';
import { Table, Model, DataType, Column, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { UserModel } from './patient.model';


@Table({
    tableName: 'post',

  timestamps:false,
})
export class Post extends Model {

  
  @ForeignKey(()=>UserModel)
  @Column
  user_id?: number;
  @BelongsTo(()=>UserModel)
  user?: UserModel;
  @Column({allowNull:true,type: DataType.STRING,})
  category?: string;
  @Column({allowNull:false ,type: DataType.STRING,})
  content?: string;
  
  @HasMany(()=>Comment)
  comments?: Comment[];
  

  
  

  
}




//bu model doğru mu bilmiyorum