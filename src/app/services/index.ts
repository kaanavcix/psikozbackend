import { Sequelize } from "sequelize-typescript";
import { UserModel } from '../models/patient.model';
import { Post } from "../models/post.model";



export const con = new Sequelize({
  database: "psikoz",
  dialect:"mysql"
  ,username:"root",
  password:"1234",
  logging:false,
  models:[UserModel,Post]
});


/* con.connect(function (err) {
  if (err) throw err;
  console.log("Connected successfully!");
});

 */
