import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IItem } from '../interface';

export type cartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop({ require: true })
  items: IItem[];
  @Prop({ min: 0 })
  totalPrice: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string;
}
export const cartSchema = SchemaFactory.createForClass(Cart);
