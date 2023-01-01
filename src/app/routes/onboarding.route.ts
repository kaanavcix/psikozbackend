import { Router } from "express";
import { LoginController } from "../controller/login.controller";
import { RegisterController } from "../controller/register.controller";
import { upload } from "../middleware/image.middleware";
let loginController: LoginController = new LoginController();
let registerController: RegisterController = new RegisterController();

export const onboardingRoute = Router();



//TODO:POST 
onboardingRoute.post("/api/register", upload.single("file"), registerController.register);
onboardingRoute.post("/api/login", loginController.login);

onboardingRoute.post("/api/forgotpassword");
