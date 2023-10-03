import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { cartDocument } from './schemas/cart.schema';
import { IItem } from './interface';
import { Observable, catchError, from, map, of, switchMap } from 'rxjs';

@Injectable()
export class CartService {
  constructor(@InjectModel('Cart') private cartModel: Model<cartDocument>) {}

  public createCart(items: IItem, userId: string): Observable<cartDocument> {
    return of(true).pipe(
      switchMap(() => of(this.getSubTotalPrice(items))),
      switchMap((subTotalPrice) => {
        const userCart = new this.cartModel({
          items: [{ ...items, subTotalPrice }],
          user: userId,
        });
        userCart.totalPrice = this.getTotalPrice(userCart.items);
        return from(userCart.save());
      }),
      catchError(() => {
        throw new InternalServerErrorException(
          'Cannot insert the cart to the user!',
        );
      }),
    );
  }
  public getCart(userId: string): Observable<cartDocument> {
    return of(true).pipe(
      switchMap(() =>
        this.cartModel.findOne({ user: userId }).select('-_id -__v'),
      ),
      map((cart) => {
        return cart;
      }),
      catchError((e) => {
        if (e instanceof HttpException) throw e;
        throw new InternalServerErrorException('failed');
      }),
    );
  }
  public deleteCart(userId: string) {
    return of(true).pipe(
      // switchMap(() => {
      //   const cart = this.getCart(userId);
      //   console.log(cart);
      //   return cart;
      // }),
      switchMap((cart) => {
        return this.cartModel.findOneAndDelete({ user: userId });
      }),
      map(() => null),
      catchError((e) => {
        if (e instanceof HttpException) throw e;
        throw new InternalServerErrorException('failed');
      }),
    );
  }
  public addItemToCart(item: IItem, userId: string): Observable<cartDocument> {
    return of(true).pipe(
      switchMap(() => this.getCart(userId)),
      switchMap((userCart) => {
        return this.addItem(userCart.items, item);
      }),
      switchMap((updatedItems) => {
        return this.cartModel.findOneAndUpdate(
          { user: userId },
          {
            items: [...updatedItems],
            totalPrice: this.getTotalPrice(updatedItems),
          },
          {
            new: true,
          },
        );
      }),
      map((updatedCart) => updatedCart),
      catchError((e) => {
        console.log(e);
        if (e instanceof HttpException) throw e;
        throw new InternalServerErrorException('Cannot update userCart');
      }),
    );
  }
  public deleteItemFromCart(
    item: IItem,
    userId: string,
  ): Observable<cartDocument> {
    return of(true).pipe(
      switchMap(() => this.getCart(userId)),
      switchMap((userCart) => {
        return this.deleteItem(userCart.items, item);
      }),
      switchMap((updatedItems) => {
        if (updatedItems.length === 0) return this.deleteCart(userId);
        return this.cartModel.findOneAndUpdate(
          { user: userId },
          {
            items: [...updatedItems],
            totalPrice: this.getTotalPrice(updatedItems),
          },
          {
            new: true,
          },
        );
      }),
      map((updatedCart) => updatedCart),
      catchError((e) => {
        console.log(e);
        if (e instanceof HttpException) throw e;
        throw new InternalServerErrorException('Cannot update userCart');
      }),
    );
  }
  private getTotalPrice(items: IItem[]): number {
    let totalPrice: number = 0;

    items.map((item: IItem) => {
      return (totalPrice += +item.subTotalPrice);
    });
    return totalPrice;
  }
  private getSubTotalPrice(items: IItem): number {
    return +items.price * +items.quantity;
  }
  private addItem(items: IItem[], toAddItem: IItem): Observable<IItem[]> {
    items.map((item) => {
      if (item.productId === toAddItem.productId) {
        item.quantity++;
        item.subTotalPrice = this.getSubTotalPrice(item);
      } else {
        toAddItem.subTotalPrice = this.getSubTotalPrice(toAddItem);
        items.push(toAddItem);
      }
    });
    return of(items);
  }
  private deleteItem(items: IItem[], toDeleteItem: IItem): Observable<IItem[]> {
    items.map((item, i) => {
      if (item.productId === toDeleteItem.productId) {
        {
          item.quantity--;
          item.subTotalPrice = this.getSubTotalPrice(item);
        }
        if (item.quantity === 0) items.splice(i, 1);
      }
    });
    return of(items);
  }
}
