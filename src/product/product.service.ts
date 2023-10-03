import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, productDoument } from './schemas/product.schema';
import { Model, Types } from 'mongoose';
import { CreateProductDTO } from './dtos/create-product.dto';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { IProduct } from './interface/product-interface';
@Injectable()
export class ProductService {
  constructor(
    private batabaseSVC: DatabaseService,
    @InjectModel('Product') public productModel: Model<productDoument>,
  ) {}
  public createProduct(
    productData: CreateProductDTO,
  ): Observable<productDoument> {
    return of(true).pipe(
      switchMap(() => this.productModel.create(productData)),
      map((res) => res),
      catchError((e) => {
        console.log(e);
        if (e instanceof HttpException) throw e;
        throw new InternalServerErrorException('failed to insert product!');
      }),
    );
  }
  public findProducts(): Observable<any> {
    return of(true).pipe(
      switchMap(() => this.productModel.find({})),
      map((res) => res),
      catchError((e) => {
        console.log(e);
        if (e instanceof HttpException) throw e;
        throw new InternalServerErrorException('failed to find product!');
      }),
    );
  }
  public findProduct(id: string): Observable<productDoument> {
    return of(true).pipe(
      switchMap(() => this.productModel.findById(id)),
      map((res) => res),
      catchError((e) => {
        console.log(e);
        if (e instanceof HttpException) throw e;
        throw new InternalServerErrorException('failed to find product!');
      }),
    );
  }
  public deleteProduct(id: string): Observable<productDoument> {
    return of(true).pipe(
      switchMap(() => this.productModel.findByIdAndDelete(id)),
      map(() => {
        return null;
      }),
      catchError((e) => {
        console.log(e);
        if (e instanceof HttpException) throw e;
        throw new InternalServerErrorException('failed to delete product!');
      }),
    );
  }
  public updateProduct(id: string, data: IProduct): Observable<productDoument> {
    return of(true).pipe(
      switchMap(() => this.productModel.findByIdAndUpdate(id, data)),
      map((res) => res),
      catchError((e) => {
        console.log(e);
        if (e instanceof HttpException) throw e;
        throw new InternalServerErrorException('failed to update product!');
      }),
    );
  }
}
