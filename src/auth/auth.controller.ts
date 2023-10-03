import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/Login.dto';
import { RegisterDTO } from './dtos';
import { Request } from 'express';
import { Public, Roles } from './decorators';
import { EUserRole } from './enum';
import { RolesGuard } from './guards/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private authSVC: AuthService) {}
  @Public()
  @Post('/login')
  login(@Body() userData: LoginDto) {
    return this.authSVC.signIn(userData.email, userData.password);
  }
  @Public()
  @Post('/register')
  register(@Body() userData: RegisterDTO) {
    return this.authSVC.signUp(userData);
  }
  // @UseGuards(AuthGuard)
  // @Public()
  // @UseGuards(RolesGuard)
  // @Roles(EUserRole.USER)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req['user'];
  }
}
