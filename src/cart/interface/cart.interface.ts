import { IItem } from './item.interface';

export interface ICart {
  items?: IItem[];
  user?: string;
  totalPrice?: number;
}
