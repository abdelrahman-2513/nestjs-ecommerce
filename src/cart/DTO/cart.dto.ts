import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ICart, IItem } from '../interface';

export class createCartDTO {
  @IsString()
  @IsNotEmpty()
  user?: string;
  @IsNotEmpty()
  @IsNumber()
  totalPrice?: number;
  @IsNotEmpty()
  items?: IItem[];
}
export class updateCartDTO implements ICart {
  @IsString()
  @IsOptional()
  user?: string;
  @IsNumber()
  @IsOptional()
  totalPrice?: number;
  @IsNotEmpty()
  @IsOptional()
  items?: IItem[];
  constructor(Cart: ICart) {
    this.user = Cart.user;
    this.items = [...Cart.items];
  }
}
