import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsUniqueEmail } from '../decorators/is-unique-email.decorator';
import { EUserRole } from '../enum';

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsEmail()
  // @IsUniqueEmail()
  email: string;
  @IsOptional()
  photo: string;
  role: EUserRole;
}
