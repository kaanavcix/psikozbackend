import { LoginController } from "../controller/login.controller";
import { RegisterController } from "../controller/register.controller";
import {Request, Response, Router} from "express";
import fs from "fs";
import multer from "multer";
import { UserController } from "../controller/user.controller";

const upload = multer({
    storage: multer.diskStorage({
        destination: (req: Request, file: any, cb: any) => {
            const directory = `./uploads/`

            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory, { recursive: true })
            }

            cb(null, directory)
        },
        filename: (req: Request, file: any, cb: any) => {
            cb(null, `${Date.now()}.${file.originalname.split(".")[file.originalname.split(".").length - 1]}`)
        }
    })
});

export const userRoute: Router =  Router();
let loginController: LoginController = new LoginController();
let registerController: RegisterController = new RegisterController();
let userController: UserController = new UserController();

userRoute.post("/api/register", upload.single("file"), registerController.register);
userRoute.post("/api/login",loginController.login);
userRoute.post("/api/user",userController.getUserData);

userRoute.post("/api/test", upload.single('avatar'), (req: Request, res: Response) => {
    res.send(req.file?.path)
});
