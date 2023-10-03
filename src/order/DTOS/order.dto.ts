import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ICart } from 'src/cart/interface';
import { EOrderStatus } from '../enum/order.enum';

export class createOrderDTO {
  @IsString()
  @IsNotEmpty()
  user: string;

  items: ICart;
  totalPrice: number;

  status: EOrderStatus;

  estimatedDate: Date;
}
export class UpdateOrderDTO {
  @IsString()
  @IsOptional()
  user: string;
  @IsOptional()
  items: ICart;
  @IsNumber()
  @IsOptional()
  totalPrice: number;

  @IsOptional()
  status: EOrderStatus;

  @IsOptional()
  estimatedDate: Date;
}
