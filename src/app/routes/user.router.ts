
import { Request, Response, Router } from "express";
import { UserController } from "../controller/user.controller";
import { upload } from "../middleware/image.middleware";


export const userRoute: Router = Router();

let userController: UserController = new UserController();


userRoute.post("/api/user", userController.getUserData);

userRoute.post("/api/test", upload.single('file'), (req: Request, res: Response) => {
    res.send(req.file?.path)
});

userRoute.post("/api/user/:id/upload", upload.single("image"),userController.updateImage);

userRoute.post("/api/user/:username",userController.usernameController);

