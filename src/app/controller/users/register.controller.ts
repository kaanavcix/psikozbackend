import { PatientModel } from '../../models/patient.model';
import{ Request,Response} from "express";

export class RegisterController {

  async registerUser(req: Request, res: Response){

    const user:PatientModel = req.body;

    try{

      //db kayıt validate göre
    }
    catch(e:any){
          console.log(e);}

  }
}

module.exports = RegisterController;