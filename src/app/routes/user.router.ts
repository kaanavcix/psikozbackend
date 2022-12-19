import { LoginController } from "../controller/users/login.controller";
import { RegisterController } from "../controller/users/register.controller";
import { Router } from "express";
import { register } from "ts-node";
import { NewLineKind } from "typescript";


  export const userRoute:Router =  Router();
  let loginController:LoginController = new LoginController();
  let registerController:RegisterController = new RegisterController();


  userRoute.post("/users/register",registerController.register);
  userRoute.post("/users/login",loginController.login);
