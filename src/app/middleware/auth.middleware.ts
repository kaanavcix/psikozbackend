import jws from "jsonwebtoken";
import { Request,Response,NextFunction,RequestHandler } from "express";
import { User } from '../models/user.model';



export const verifyToken: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers.token;

  if (token !== null) {
    User.findOne({
      where: {
        token: token,
      }
    });
  }



  next((err: Error) => {
    return res.status(404).send({
      message: err.message,
      status: false,

    })
  });
}

export const verifyDoctor: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.token;
  console.log(token);
  if (token === null || token === undefined) {

    return res.status(404).send({
      message: "error",
    });
  }


  var data = await User.findOne({
    where: {
      token: token,
    }
  });
  if (data === null) {
    return res.status(404).send({
      message: "error message",
    });
  }
  if (data?.is_patient == false) {
    next();
  }

  if(data.is_patient == true) {

    return res.status(404).send({
      message:"user is patient",
      sucess:false
    })
  }




}

