import { Router } from "express"
import { Request,Response,NextFunction } from "express";

export const baseRoute = Router();

baseRoute.get("/",(req: Request, res: Response, next: NextFunction) => {

    res.send("Psikoz 1.0.1 version API");
  
  }).get("/psikozexpa",);
  (req: Request, res: Response, next: NextFunction) => res.send("Kodun son safeine geldiniz teşekkür ederim");
  
  

  