// import { Prop, SchemaFactory } from '@nestjs/mongoose';
// import { HydratedDocument, Types } from 'mongoose';
// import { Product } from 'src/product/schemas/product.schema';

// export type ItemType = HydratedDocument<Item>;

// export class Item {
//   @Prop({ type: Types.ObjectId, ref: 'Product' })
//   productId: string;

//   @Prop()
//   name: string;
//   @Prop({ min: 0 })
//   price: number;
//   @Prop({ min: 1 })
//   quantity: number;
// }

// export const itemSchema = SchemaFactory.createForClass(Item);
