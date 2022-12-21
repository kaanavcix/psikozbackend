import { LoginController } from "../controller/login.controller";
import { RegisterController } from "../controller/register.controller";
import { Router } from "express";
import { register } from "ts-node";
import { NewLineKind } from "typescript";


  export const userRoute:Router =  Router();
  let loginController:LoginController = new LoginController();
  let registerController:RegisterController = new RegisterController();


  userRoute.post("/api/register",registerController.register);
  userRoute.post("/api/login",loginController.login);
