import { RequestHandler ,Request,Response,NextFunction} from 'express';
import { User } from '../models/patient.model';



class AuthController {



  verifyToken:RequestHandler = async(req:Request, res:Response,next:NextFunction) =>{

    const token  = req.headers;

    User.findOne({
      where:{
        token:token,
      }
    });

    next((err:Error) =>{
      return res.status(404).send({
        message: err.message,
        status: false,

      })
    });
  }
}