import { Router } from "express";
import { LoginController } from "../controller/login.controller";
import { RegisterController } from "../controller/register.controller";
import { upload } from "../middleware/image.middleware";
import UserRepository from "../services/user.repository";
let loginController: LoginController = new LoginController();
let registerController: RegisterController = new RegisterController(new UserRepository());

export const onboardingRoute = Router();



//TODO:POST 
onboardingRoute.post("/api/register", upload.single("file"), registerController.register);
onboardingRoute.post("/api/login", loginController.login);

onboardingRoute.post("/api/forgotpassword");


onboardingRoute.post("/api/test/register",registerController.register);