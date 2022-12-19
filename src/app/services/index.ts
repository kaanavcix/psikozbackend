import { Sequelize } from "sequelize-typescript";
import { UserModel } from "../models/user.model";
import * as dotenv from "dotenv";

dotenv.config();

export const con = new Sequelize({
    host: process.env.HOST,
    database: process.env.DB_NAME,
    dialect: "mysql",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: false,
    models: [UserModel]
});

/* con.connect(function (err) {
  if (err) throw err;
  console.log("Connected successfully!");
}); */
