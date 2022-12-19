import jws from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
import { UserModel } from '../models/patient.model';


const verifyToken  = async(req:Request,res:Response,next:NextFunction)=>{

  const authead= req.headers.token;
  if(authead){
   
    const token = (authead as string).split(" ")[1];
    jws.verify(token,"ecom",(err,user)=>{
      

    })

  }
}

