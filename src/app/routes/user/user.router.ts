import { LoginController } from "../../controller/users/login.controller";
import { RegisterController } from "../../controller/users/register.controller";
import { Router } from "express";

export const userRoute: Router = Router();
let loginController: LoginController = new LoginController();
let registerController: RegisterController = new RegisterController();

userRoute.post("/users/login", loginController.login);
userRoute.post("/users/register", registerController.register);
