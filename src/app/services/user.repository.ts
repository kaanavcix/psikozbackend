import validator from "email-validator";
import { User, LoginModel } from "../models/user.model";

class UserRepository {
  

  async addUser(user: any) {
         try {
          await User.create({
            token: user.token,
            name: user.name,
            username: user.username,
            avatar: user.avatar,
            age: Number(user.age),
            gender: user.gender,
            joined_at: user.joined_at,
            password: user.password,
            doctor_file: user.doctor_file,
            email: user.email,
            is_patient: user.is_patient || false,
          });
         } catch (error) {
          console.error(error);
         }
    }
  
  async usermailControl(email: string): Promise<boolean> {
    if (validator.validate(email)) {
      let controlUser = await User.findAll({
        where: {
          email: email,
        },
      });
      if (controlUser.length !== 0) return true;
      return false;
    }

    return false;
  }

  async findOneUser(loginModel: LoginModel) {
    if (await this.usermailControl(loginModel.email!)) {
      let data = await User.findOne({
        where: { email: loginModel.email, password: loginModel.password },
      });

      return {
        token: data?.token,
        username: data?.username,
        id: data?.id,
      };
    }
  }

  async findById(id?: string): Promise<User | null> {
    let data = await User.findOne({
      where: { id: id },
    });

    return data;
  }
  async findByToken(token?: string): Promise<User | null> {
    let data = await User.findOne({
      where: { token: token },
    });

    return data;
  }

  async usernameControl(username: string): Promise<boolean> {
    let data = await User.findAll({
      where: {
        username: username,
      },
    });

    if (data.length !== 0) {
      return true;
    }
    return false;
  }

  
}

export default UserRepository;
