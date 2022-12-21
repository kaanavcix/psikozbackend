import {Comment} from './comment.model';
import { Table, Model, DataType, Column, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from './patient.model';


@Table({
    tableName: 'post',

  timestamps:false,
})
export class Post extends Model {

  
  @ForeignKey(()=>User)
  @Column
  user_id?: number;
  @BelongsTo(()=>User)
  user?: User;
  @Column({allowNull:true,type: DataType.STRING,})
  category?: string;
  @Column({allowNull:false ,type: DataType.STRING,})
  content?: string;
  @Column({type: DataType.STRING,})
  status?:string;
  
  @HasMany(()=>Comment)
  comments?: Comment[];
  

  
  

  
}




//bu model doğru mu bilmiyorum