import { Request, Response, RequestHandler } from "express";
import { UserModel, LoginModel } from '../../models/user.model';

export class LoginController {
    login: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { email, password }: LoginModel = req.body;

            if (email && password) {
                let userControl = await UserModel.findOne({
                    where: {email, password}
                });

                if (userControl !== null) {
                    return res.status(200).json({
                        status: "success",
                        message: 0x1,
                        token: userControl.token
                    });
                } else {
                    return res.status(400).json({
                        status: "error",
                        message: 0x8
                    });
                }
            } else {
                return res.status(400).json({
                    status: "error",
                    message: 0x4
                });
            }
        } catch (err: any) {
            return res.status(400).json({
                status: "fatal_error",
                message: 0x12
            });
        }
    }
}


