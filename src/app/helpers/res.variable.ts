import { Response } from "express";

 function MessageReturn(res: Response, message: String):Response {
  return res.status(201).send({
    success: false,
    message: message,
  });
}


function SucessMessage(res:Response, message: any):Response {

  return res.status(200).send({
    success: true,
    message: message,
  });
}

function ErrorMessage(res:Response, message: String):Response {

  return res.status(404).send({
    success: false,
    message: message,
  });
}




export   {
  MessageReturn,
  SucessMessage,ErrorMessage

}