import { register } from 'ts-node';
// noinspection SpellCheckingInspection

import {Request, Response, RequestHandler} from "express";
import {v4 as uuidv4} from "uuid";
import moment from "moment";
import crypto from "crypto";
import validator from "email-validator";
import { UserModel,RegisterModel } from "../../models/patient.model";

export class RegisterController {
    register: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { username, email, password, age, gender,is_patient }: RegisterModel = req.body;

            if (validator.validate(<string>email)) {
                let emailControl = await UserModel.findAll({
                    where: {email}
                });
                if (emailControl.length !== 0) {
                    // Böyle bir e-posta daha önce kayıt olmuş
                    return res.status(400).send({
                        status: false,
                        message: 0x5000
                    });
                }

                const timestamp = moment().unix();

                let newGender = 1;
                if (gender === "male" || gender === "1") {
                    newGender = 1;
                } else if (gender === "female" || gender === "2") {
                    newGender = 2;
                } else {
                    newGender = 3;
                }

                if (Number(age) < 18) {
                    // Erişkin değil
                    return res.status(400).send({
                        status: false,
                        message: 0x99
                    });
                }

                let newUsername = username;
                if (username === undefined || username.length <= 3) {
                    // Username yok ya da 3 karakterden az
                    return res.status(400).send({
                        status: false,
                        message: 0x98
                    });
                } else {
                    newUsername = username.replace(/\s/g, "");
                }

                let usernameControl = await UserModel.findAll({
                    where: {username: newUsername}
                });
                if (usernameControl.length !== 0) {
                    // Bu kullanıcı adı daha önce alınmış
                    return res.status(400).send({
                        status: false,
                        message: 0x4000
                    });
                }

                if (password === undefined || password.length <= 3) {
                    // Şifre yok ya da 3 karakterden az
                    return res.status(400).send({
                        status: false,
                        message: 0x97
                    });
                }

                const token = crypto
                    .createHash("sha256")
                    .update(uuidv4())
                    .digest("hex");

                const data = await UserModel.create({
                    token,
                    name: newUsername,
                    username: newUsername,
                    avatar: "",
                    age: Number(age),
                    gender: newGender,
                    joined_at: timestamp,
                    password: password,
                    email,
                    is_patient: is_patient||false,
                });

                return res.status(200).json({
                    status: true,
                    message: 0x1,
                    token,
                });
            } else {
                return res.status(400).send({
                    status: false,
                    message: 0x4
                });
            }
        } catch (e: any) {
            console.log(e);
        }
    }
}
