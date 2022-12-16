import User from '../../models/user';
import con from "..";

import { IUserService } from './base.user.service';
import LoginModel from '../../models/login.model';



class UserService implements IUserService{
  getUserByEmail(loginModel: LoginModel): void {
    throw new Error('Method not implemented.');
  }
  getUserbyId(userId: string): User[] {
    throw new Error('Method not implemented.');
  }
  updateUser(user: User): void {
    throw new Error('Method not implemented.');
  }
  addUser(user: User): void {
    throw new Error('Method not implemented.');
  }
  deleteUser(userId: string): void {
    throw new Error('Method not implemented.');
  }
  getUsers(): User[] {
    throw new Error('Method not implemented.');
  }
  

}

