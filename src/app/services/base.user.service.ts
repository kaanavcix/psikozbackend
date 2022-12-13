import LoginModel from "../models/login.model";
import User from "../models/user";

export interface IUserService {

  getUserbyId(userId: string): User[];
  updateUser(user: User): void;
  addUser(user: User): void;
  deleteUser(userId: string): void;
  getUsers(): User[];
  getUserByEmail(loginModel:LoginModel):void ;
  getUserbyId(userId: string):void;

}
