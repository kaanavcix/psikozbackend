import { Request, Response, RequestHandler } from "express";
import LoginModel from '../../models/login.model';
import { UserModel } from '../../models/patient.model';

export class LoginController {

  login: RequestHandler = async (req: Request, res: Response) => {

    try {

      const login: LoginModel = req.body;

      let array = await UserModel.findAll({ where: { email: login.email, password: login.password, } });
      if (array.length > 0) {
        return res.status(200).json({
          status: "success",
          token: "token"
          ,
        });
      }
      else if (!login.email || !login.password) {
        return res.status(400).json({
          status: "error",
          message: "Email veya Şifre hatalı"
        });
      }
      else if (array.length == 0) {
        return res.status(400).json({
          status: "error",
          message: "Kullanıcı bulunamadı"
        });
      }


    }
    catch (err: any) {
      console.log(err);
    }
  }
}


