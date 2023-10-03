import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDTO } from './dtos/create-user-dto';
import {
  Observable,
  forkJoin,
  from,
  lastValueFrom,
  map,
  mergeMap,
  of,
  switchMap,
} from 'rxjs';
import * as bcrypt from 'bcrypt';
import { IUser } from './interface/user-interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  public createUser(newUser: CreateUserDTO): Observable<UserDocument> {
    return from(this.hashPassword(newUser.password)).pipe(
      switchMap((hashedPass: string) => {
        const user = new this.userModel(newUser);
        if (!user.photo) user.photo = 'noPhoto.png';
        user.password = hashedPass;
        return from(user.save());
      }),
    );
  }
  public findUserByEmail(email: string): Observable<IUser> {
    return of(true).pipe(
      switchMap(() => this.userModel.findOne({ email: email }).exec()),
      map((res) => res),
    );
  }

  private hashPassword(str: string): Observable<string> {
    return from(bcrypt.genSalt()).pipe(
      switchMap((salt) => {
        return from(bcrypt.hash(str, salt));
      }),
    );
  }
}
