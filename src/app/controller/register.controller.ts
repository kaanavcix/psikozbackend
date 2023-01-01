import { register } from 'ts-node';
// noinspection SpellCheckingInspection

import {Request, Response, RequestHandler} from "express";
import {v4 as uuidv4} from "uuid";
import moment from "moment";
import crypto from "crypto";
import validator from "email-validator";
import { User,RegisterModel } from "../models/user.model";

export class RegisterController {
    register: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { name,username, email, password, age, gender, is_patient }: RegisterModel = req.body;

            if (validator.validate(<string>email)) {
                let emailControl = await User.findAll({
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

                let usernameControl = await User.findAll({
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

                const is_patient_new = is_patient=="1"?true :false;

                const token = crypto
                    .createHash("sha256")
                    .update(uuidv4())
                    .digest("hex");

                const data = await User.create({
                    token,
                    name: name,
                    username: newUsername,
                    avatar: "",
                    age: Number(age),
                    gender: newGender,
                    joined_at: timestamp,
                    password: password,
                    doctor_file: req.file?.path,
                    email,
                    is_patient: is_patient_new || false,
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
