import { UserModel } from '../../models/patient.model';
import{ Request,Response,RequestHandler,NextFunction} from "express";

export class RegisterController {

  register:RequestHandler  = async (req: Request, res: Response,next:NextFunction)=>{

    const user:UserModel = req.body;

    try{
     let data =  await UserModel.create({...user});

     return res.status(200).json({
        success: true,
        message: 'User Registered Successfully',
        token: "token",
        "data": data

      })
    }
    catch(e:any){
          console.log(e);}

  }
}

