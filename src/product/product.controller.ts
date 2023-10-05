import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { Types } from 'mongoose';
import { IProduct } from './interface/product-interface';
import { Roles } from 'src/auth/decorators';
import { EUserRole } from 'src/auth/enum';
import { FilterProductDTO } from './dtos/filter-product.dto';

@Controller('product')
export class ProductController {
  constructor(private productSVC: ProductService) {}
  @Get('/')
  findProducts() {
    return this.productSVC.findProducts();
  }
  @Get('/filterd')
  findFilteredProducts(filterDTO: FilterProductDTO) {
    return this.productSVC.getFilteredProducts(filterDTO);
  }
  @Roles(EUserRole.ADMIN)
  @Post('/')
  createProduct(@Body() createProduct: CreateProductDTO) {
    return this.productSVC.createProduct(createProduct);
  }
  @Roles(EUserRole.ADMIN)
  @Patch('/:id')
  updateProduct(@Param('id') id: string, @Body() createProduct: IProduct) {
    return this.productSVC.updateProduct(id, createProduct);
  }
  @Get('/:id')
  findProduct(@Param('id') id: string) {
    return this.productSVC.findProduct(id);
  }
  @Roles(EUserRole.ADMIN)
  @Delete('/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productSVC.deleteProduct(id);
  }
}
