import { RequestHandler, Response, Request } from 'express';
import { User, TokenModel } from '../models/user.model';

export class UserController {
    getUserData: RequestHandler = async (req: Request, res: Response) => {
        const token: TokenModel = req.body.token;
        if (!token) {
            return res.status(400).json({
                status: false,
            });
        }

        let user = await User.findOne({
            where: {
                token: token,
            },
        });

        res.status(200).send({
            success: true,
            data: {
                id: user?.id,
                name: user?.name,
                username: user?.username,
                is_patient: user?.is_patient,
                age: user?.age,
                gender: user?.gender,
                description: user?.description
            }
        });
    }
}
