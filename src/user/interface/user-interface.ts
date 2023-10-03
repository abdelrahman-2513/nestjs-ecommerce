import { Types } from 'mongoose';
import { EUserRole } from 'src/auth/enum';

export interface IUser {
  _id?: Types.ObjectId;
  name?: string;
  password?: string;
  role?: EUserRole;
  email?: string;
}
