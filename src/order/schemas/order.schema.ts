import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { ICart } from 'src/cart/interface';
import { Cart } from 'src/cart/schemas/cart.schema';
import { EOrderStatus } from '../enum/order.enum';
import { shippingDate } from '../constants/shipping.const';

export type orderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string;
  @Prop({ type: Object })
  items: ICart;
  @Prop()
  totalPrice: string;
  @Prop({ default: 'placed' })
  status: EOrderStatus;
  @Prop({ type: Date, default: shippingDate })
  estimatedDate: Date;
}

export const orderSchema = SchemaFactory.createForClass(Order);
