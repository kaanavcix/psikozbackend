import { Sequelize } from "sequelize-typescript";
import { UserModel } from '../models/patient.model';
import { Post } from "../models/post.model";
import { Comment } from "../models/comment.model";

import * as dotenv from 'dotenv';

dotenv.config();

export const con = new Sequelize({
  database: process.env.DB_NAME,
  dialect:"mysql"
  ,username:process.env.DB_USERNAME,
  password:process.env.DB_PASSWORD,
  logging:false,
  models:[UserModel,Post,Comment]
});


/* con.connect(function (err) {
  if (err) throw err;
  console.log("Connected successfully!");
});

 */
