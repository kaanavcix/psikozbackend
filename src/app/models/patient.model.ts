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
  @Column({ allowNull: false, type: DataType.STRING})
  avatar?: string;
  @Column({ allowNull: false, type: DataType.INTEGER })
  age?: number;
  @Column({ allowNull: false, type: DataType.INTEGER })
  gender?: number;
  @Column({ allowNull: false, type: DataType.STRING })
  joined_at?: number;
  @Column({ allowNull: false, type: DataType.STRING })
  email?: string;
  @Column({ allowNull: false, type: DataType.STRING })
  password?: string;

  @Column({ allowNull: false, type: DataType.BOOLEAN })
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
  username?: string;
  email?: string;
  password?: string;
  age?: string;
  gender?: string;
  is_patient?:boolean;
}