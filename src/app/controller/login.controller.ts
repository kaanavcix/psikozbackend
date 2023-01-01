import { Request, Response, RequestHandler } from "express";
import { User, LoginModel } from "../models/user.model"

export class LoginController {
    login: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { email, password }: LoginModel = req.body;
            if (email && password) {
                let model = await User.findOne({
                    where: { email: email, password, }
                });

                if (model !== null) {
                    return res.status(200).json({
                        status: true,
                        message: 0x1,
                        token: model.token
                    });
                } else if (!email || !password) {
                    return res.status(400).json({
                        status: false,
                        message: 0x8
                    });
                } else {
                    return res.status(400).json({
                        status: false,
                        message: 0x4
                    });
                }
            }
        } catch (err: any) {
            return res.status(400).json({
                status: "fatal-error",
                message: 0x12
            })
        }
    }
}
