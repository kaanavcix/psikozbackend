import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript"
import sequelize from "sequelize";
import { Post } from "./post.model";

@Table({
  tableName: "user",
  // modelName: "user",
  timestamps: false,


})
export class UserModel extends Model {
  @Column({ allowNull: false, type: DataType.STRING })
  username?: string;
  @Column({ allowNull: false, type: DataType.STRING })
  email?: string;
  @Column({ allowNull: false, type: DataType.STRING })
  firstname?: string;
  @Column({ allowNull: true, type: DataType.STRING })
  anonimName?: string;
  @Column({ allowNull: false, type: DataType.BOOLEAN })
  ispatient?: boolean;
  @Column({ allowNull: true, type: DataType.STRING })
  image?: string;
  @Column({ allowNull: false, type: DataType.INTEGER })
  age?: number;

  @Column({ allowNull: false, type: DataType.INTEGER })
  gender?: number;

  @Column({ primaryKey: true, autoIncrement: true, allowNull: false, type: DataType.INTEGER })
  userid?: number;
  @Column({ allowNull: false, type: DataType.STRING })
  password?: string;

  @HasMany(()=>Post) 
  posts?:Post[];




  //daha eklerz




}

//console.log(PatientModel===sequelize.Model.User)

