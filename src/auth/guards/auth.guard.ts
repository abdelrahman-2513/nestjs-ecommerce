import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { ATPayload } from '../payloads/access-token-payload';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return of(true);
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    return of(token).pipe(
      switchMap((token) =>
        this.jwtService.verifyAsync(token, {
          secret: process.env.AT_SECRET,
        }),
      ),
      switchMap((payload) => {
        request.user = payload;
        return of(true);
      }),
      catchError((e) => {
        console.log(e);
        if (e instanceof HttpException) throw e;
        throw new InternalServerErrorException('Unauthorized');
      }),
    );
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
