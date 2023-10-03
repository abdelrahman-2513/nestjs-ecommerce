import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CartModule } from 'src/cart/cart.module';
import { MongooseModule } from '@nestjs/mongoose';
import { orderSchema } from './schemas/order.schema';

@Module({
  imports: [
    CartModule,
    MongooseModule.forFeature([{ name: 'Order', schema: orderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
