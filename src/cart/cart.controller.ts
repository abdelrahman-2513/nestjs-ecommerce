import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { createItemDTO, updateItemDTO } from './DTO';
import { Request } from 'express';

@Controller('cart')
export class CartController {
  constructor(private cartSVC: CartService) {}

  @Post('/')
  createCart(@Req() req: Request, @Body() itemsData: createItemDTO) {
    return this.cartSVC.createCart(itemsData, req['user'].id);
  }
  @Post('/item/add')
  addToCart(@Req() req: Request, @Body() itemsData: createItemDTO) {
    return this.cartSVC.addItemToCart(itemsData, req['user'].id);
  }
  @Post('/item/delete')
  deleteItem(@Req() req: Request, @Body() itemsData: updateItemDTO) {
    return this.cartSVC.deleteItemFromCart(itemsData, req['user'].id);
  }
  @Get('/')
  getUserCart(@Req() req: Request) {
    return this.cartSVC.getCart(req['user'].id);
  }
}
