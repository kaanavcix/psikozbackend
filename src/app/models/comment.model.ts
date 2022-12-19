import { DataType, ForeignKey, Model,BelongsTo,Column,Table } from "sequelize-typescript";
import { UserModel } from "./patient.model";
import { Post } from "./post.model";

@Table({
  tableName: 'comment',
timestamps:false,
})
export class Comment extends Model {

@ForeignKey(()=>UserModel)
@Column
user_id?: number;
@Column({allowNull:true,type: DataType.STRING,})
comment?:string;
@Column({allowNull:true,type: DataType.STRING,})
joined_at?: string;
@ForeignKey(()=>Post)
post_id?: number;

@BelongsTo(()=>Post)
post?: Post;
@BelongsTo(()=>UserModel)
user?: UserModel;



}