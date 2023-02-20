import { Request, Response, RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import crypto from "crypto";
import { User, RegisterModel } from "../models/user.model";
import UserRepository from "../services/user.repository";
import { MessageReturn } from "../helpers/res.variable";
import { AppUtility } from "../utility/app.constant";

export class RegisterController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  register: RequestHandler = async (req: Request, res: Response) => {
    try {
      const {
        name,
        username,
        email,
        password,
        age,
        gender,
        is_patient,
      }: RegisterModel = req.body;

      if (await this.userRepository.usermailControl(email!))
        MessageReturn(res, AppUtility.register_email_fail);

      const timestamp = moment().unix();

      let newGender = this.genderDetection(gender!);

      if (Number(age) < 18) MessageReturn(res, AppUtility.register_age_fail);

      let newUsername = username;
      if (
        username === undefined ||
        username.length <= 3 ||
        (await this.userRepository.usernameControl(newUsername!))
      ) {
        // Username yok ya da 3 karakterden az
        MessageReturn(res, AppUtility.register_username_fail);
      } else {
        newUsername = username.replace(/\s/g, "");
      }

      if (password === undefined || password.length <= 3)
        MessageReturn(res, AppUtility.register_password_fail);

      const is_patient_new = is_patient == "1" ? true : false;

      const token = crypto.createHash("sha256").update(uuidv4()).digest("hex");

      const data = {
        token: token,
        name: name,
        username: newUsername,
        avatar: "",
        age: Number(age),
        gender: newGender,
        joined_at: timestamp,
        password: password,
        doctor_file: req.file?.path,
        email: email,
        is_patient: is_patient_new || false,
      };

      this.userRepository.addUser(data);

      return res.status(200).json({
        status: true,
        message: 0x1,
        token,
      });
    } catch (e: any) {
      console.log(e);
    }
  };

private genderDetection(gender: String): number {
    let newGender: number;
    if (gender === "male" || gender === "1") return (newGender = 1);
    else if (gender === "female" || gender === "2") return (newGender = 2);
    else return (newGender = 3);
  }
}
