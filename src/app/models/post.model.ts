import {Comment} from './comment.model';
import { Table, Model, DataType, Column, ForeignKey, BelongsTo, HasMany, PrimaryKey } from 'sequelize-typescript';
import { User } from './user.model';


@Table({
    tableName: 'post',

  timestamps:false,
})
export class Post extends Model {

  @Column({autoIncrement:true,primaryKey:true,type:DataType.INTEGER})
  id?: number;
  @ForeignKey(()=>User)
  @Column
  user_id?: number;
  @BelongsTo(()=>User)
  user?: User;
  @Column({allowNull:true,type: DataType.STRING,defaultValue:""})
  category?: string;
  @Column({allowNull:false ,type: DataType.STRING,})
  content?: string;
  @Column({type: DataType.STRING,defaultValue:"1"})
  status?:string;
  @Column({type: DataType.INTEGER,allowNull:true})
  timestamp!:number;
  @Column({type: DataType.INTEGER,allowNull:true})
  photoUrl?:String;
  
  @HasMany(()=>Comment)
  comments?: Comment[];
  

  
  

  
}




//bu model doğru mu bilmiyorum


export class PostInput  extends Model{


  user_id?: number;
  content?: string;
}


export class StatusModel extends Model{
  
  id?:number;
  name?:string;
  
}