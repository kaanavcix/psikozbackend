import { Table, Column, Model, DataType, HasMany, Default } from "sequelize-typescript"
import sequelize from "sequelize";
import { Post } from "./post.model";

@Table({
  tableName: "user",
  // modelName: "user",
  timestamps: false,


})
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false, type: DataType.INTEGER })
  id?: number;
  @Column({ allowNull: false, type: DataType.STRING })
  token?: string;
  @Column({ allowNull: false, type: DataType.STRING })
  name?: string;
  @Column({ allowNull: true, type: DataType.STRING })
  username?: string;
  @Column({ allowNull: true, type: DataType.STRING})
  avatar?: string;
  @Column({ allowNull: true, type: DataType.INTEGER })
  age?: number;
  @Column({ allowNull: true, type: DataType.INTEGER })
  gender?: number;
  @Column({ allowNull: true, type: DataType.STRING })
  joined_at?: number;
  @Column({ allowNull: true, type: DataType.STRING })
  email?: string;
  @Column({ allowNull: true, type: DataType.STRING })
  password?: string;
  @Column({ allowNull: true, type: DataType.STRING })
  description?:string;
  @Column({ allowNull: true, type: DataType.STRING })
  doctor_file?:string;
  @Column({ allowNull: false, type: DataType.BOOLEAN ,defaultValue:true})
  is_patient?: boolean;

  @HasMany(()=>Post) 
  posts?:Post[];


}

export class LoginModel extends Model{

  email?:string;
  password?:string;

}


// TODO: Taslak model sen bi yine de bakarsın
export class RegisterModel extends Model {
  name?:string;
  username?: string;
  email?: string;
  password?: string;
  age?: string;
  gender?: string;
  is_patient?: string;

}

export class TokenModel{
  token?:string;
}


export class GenderModel extends Model{

  @Column({ allowNull: true, type: DataType.INTEGER })
  id?:number;
  @Column({ allowNull: true, type: DataType.STRING })
  name?:string;
  

} 