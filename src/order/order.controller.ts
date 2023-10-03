import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { UpdateOrderDTO, createOrderDTO } from './DTOS';
import { Request } from 'express';

@Controller('order')
export class OrderController {
  constructor(private orderSVC: OrderService) {}

  @Post('create/')
  createOrder(@Body() orderData: createOrderDTO) {
    return this.orderSVC.placeOrder(orderData);
  }
  @Get('')
  getOrders(@Req() req: Request) {
    return this.orderSVC.getOrders(req['user'].id);
  }
  @Delete('/:id')
  getOrder(@Param() id: string) {
    return this.orderSVC.cancelOrder(id);
  }
  @Patch('/:id')
  updateOrder(@Body() orderData: UpdateOrderDTO, @Param() id: string) {
    return this.orderSVC.updateOrder(orderData, id);
  }
}
