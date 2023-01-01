import { Router } from "express"
import { Request, Response, NextFunction } from "express";

export const baseRoute = Router();

baseRoute.get("/", (req: Request, res: Response) => {
  res.send("Psikoz 1.2.0 version API");
});



