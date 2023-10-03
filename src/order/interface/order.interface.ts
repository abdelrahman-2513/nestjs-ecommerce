import { ICart } from 'src/cart/interface';
import { EOrderStatus } from '../enum/order.enum';

export interface IOrder {
  user?: string;
  items?: ICart;
  totalPrice?: number;
  status?: EOrderStatus;
  estimatedDate?: Date;
}
