import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { EUserRole } from 'src/auth/enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  photo: string;
  @Prop()
  password: string;
    @Prop({ default: 'user' })
    role: EUserRole;
  // @Prop({type:[{ type: Types.ObjectId, ref: 'Order' }]})
  // order:Order[];
}

export const userSchema = SchemaFactory.createForClass(User);
