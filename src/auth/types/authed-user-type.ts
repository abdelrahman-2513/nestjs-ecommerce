import { IUser } from 'src/user/interface/user-interface';
import { EUserRole } from '../enum';
import { Types } from 'mongoose';

export class LoggedUser implements IUser {
  _id?: Types.ObjectId;
  email?: string;
  name?: string;
  role?: EUserRole;
  password?: string;
  constructor(user: IUser) {
    this._id = user._id;
    this.email = user.email;
    this.name = user.name;
    this.role = user.role;
    this.password = user.password;
  }
}
export class AuthedUser {
  user: IUser;

  access_token: string;

  constructor(user: IUser, accessToken: string) {
    this.user = new LoggedUser(user);
    this.access_token = accessToken;
  }
}
