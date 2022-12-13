import { Request, Response } from "express";
import LoginModel from '../../models/login.model';

export class LoginController {

  async  login(req: Request, res: Response) {

    try {

      const login:LoginModel  = req.body;
      //const user = await db.findOne({email}); db calling lazım

      if (login.email === "kaanavcix@gmail.com" && login.password === "12345") {
        return res.status(200).json({
          status: "success",
          token: "token"
          ,
        });
      }
      if(!login.email||!login.password) {
        return res.status(400).json({
                  status: "error",
                message:"Email veya Şifre hatalı"});
      }


    }
    catch (err: any) 
    {
      console.log(err);}
}}


module.exports = LoginController;