import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/create-user-dto';

@Controller('user')
export class UserController {
  constructor(private userSVC: UserService) {}
  @Post('/')
  createUser(@Body() userData: CreateUserDTO) {
    return this.userSVC.createUser(userData);
  }
}
