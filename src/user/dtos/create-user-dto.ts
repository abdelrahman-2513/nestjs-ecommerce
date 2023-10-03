import { IsNotEmpty, IsString } from 'class-validator';
import { IsUniqueEmail } from 'src/auth/decorators';
import { EUserRole } from 'src/auth/enum';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  photo: string;
  role: EUserRole;
}
