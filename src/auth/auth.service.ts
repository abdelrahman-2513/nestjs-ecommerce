import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  Observable,
  catchError,
  forkJoin,
  from,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/user/interface/user-interface';
import { ATPayload } from './payloads/access-token-payload';
import { AuthedUser } from './types';
import { CreateUserDTO } from 'src/user/dtos/create-user-dto';
import { RegisterDTO } from './dtos';
@Injectable()
export class AuthService {
  constructor(
    private userSVC: UserService,
    private jwtSVC: JwtService,
  ) {}

  signIn(email: string, pass: string): Observable<AuthedUser> {
    return of(true).pipe(
      switchMap(() => this.userSVC.findUserByEmail(email)),
      switchMap((user) =>
        forkJoin([of(user), from(this.verifyHash(pass, user.password))]),
      ),
      switchMap(([user, validUser]) =>
        validUser
          ? this.generateAccessToken(user)
          : throwError(
              () => new UnauthorizedException('invalid email or password!'),
            ),
      ),
      catchError((e) => {
        if (e instanceof HttpException) throw e;
        throw new InternalServerErrorException('failed to login');
      }),
    );
  }
  signUp(user: RegisterDTO): Observable<AuthedUser> {
    return of(true).pipe(
      switchMap(() => this.userSVC.findUserByEmail(user.email)),
      switchMap((userFound) =>
        userFound
          ? throwError(
              () =>
                new UnauthorizedException('Email already exsist or invalid!'),
            )
          : this.userSVC.createUser(user),
      ),

      switchMap((user) => this.generateAccessToken(user)),

      catchError((e) => {
        console.log(e);
        if (e instanceof HttpException) throw e;
        throw new InternalServerErrorException('failed to login');
      }),
    );
  }
  private verifyHash(pass: string, userPass: string) {
    return new Observable((observer) => {
      bcrypt.compare(pass, userPass, (e: any, same: any) => {
        if (e) {
          observer.error(e);
        } else {
          observer.next(same);
          observer.complete();
        }
      });
    });
  }
  private generateAccessToken(user: IUser): Observable<AuthedUser> {
    const Payload: ATPayload = {
      id: user._id,
      role: user.role,
    };
    return from(
      this.jwtSVC.signAsync(Payload, {
        secret: process.env.AT_SECRET,
        expiresIn: '20d',
      }),
    ).pipe(map((AT: string) => new AuthedUser(user, AT)));
  }
}
