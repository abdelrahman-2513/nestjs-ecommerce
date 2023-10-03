import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../user.service';
import { Observable, lastValueFrom, map, of, switchMap } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
@ValidatorConstraint({ name: 'email', async: true })
export class IsUniqueEmailConstraints implements ValidatorConstraintInterface {
  // constructor(private readonly userSVC: UserService) {}
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}
  async validate(email: string) {
    if (!email) return false;
    const isUnique = await lastValueFrom(this.isUnique(email));
    return isUnique;
  }

  defaultMessage(): string {
    return 'This Email already exist or Invalid!';
  }

  private isUnique(email: string): Observable<boolean> {
    console.log(email);
    // return this.userSVC.findUserByEmail(email).pipe(
    //   map((user) => {
    //     console.log(user);
    //     return !user;
    //   }),
    // );
    return of(true).pipe(
      switchMap(() => this.userModel.findOne({ email: email })),
      map((user) => !user),
    );
  }
}
