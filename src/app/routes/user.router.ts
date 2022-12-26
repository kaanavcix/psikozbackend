import { LoginController } from "../controller/login.controller";
import { RegisterController } from "../controller/register.controller";
import { Router } from "express";

import { UserController } from "../controller/user.controller";


  export const userRoute:Router =  Router();
  let loginController:LoginController = new LoginController();
  let registerController:RegisterController = new RegisterController();
  let userController : UserController = new UserController();


  userRoute.post("/api/register",registerController.register);
  userRoute.post("/api/login",loginController.login);
  userRoute.post("/api/user",userController.getUserData);


