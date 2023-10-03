import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CartService } from 'src/cart/cart.service';
import { orderDocument } from './schemas/order.schema';
import { IOrder } from './interface/order.interface';
import { Observable, catchError, from, map, of, switchMap } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    private cartSVC: CartService,
    @InjectModel('Order') private orderModel: Model<orderDocument>,
  ) {}

  public placeOrder(orderData: IOrder) {
    return of(true).pipe(
      switchMap(() => this.cartSVC.getCart(orderData.user)),
      switchMap((cart) => {
        const order = new this.orderModel({
          user: orderData.user,
          items: cart,
          totalPrice: cart.totalPrice,
        });

        return from(order.save());
      }),
      switchMap(() => this.cartSVC.deleteCart(orderData.user)),
      switchMap(() => this.getOrders(orderData.user)),
      map((order) => order),
      catchError(() => {
        throw new BadRequestException('Sorry Try Again Later!');
      }),
    );
  }
  public getOrders(userId: string) {
    return of(true).pipe(
      switchMap(() => this.orderModel.find({ user: userId })),
      map((order) => order),
      catchError(() => {
        throw new BadRequestException('Sorry Try Again Later!');
      }),
    );
  }
  public cancelOrder(orderId: string): Observable<orderDocument> {
    return of(true).pipe(
      switchMap(() =>
        this.orderModel.findByIdAndDelete(new Types.ObjectId(orderId)),
      ),
      map(() => null),
      catchError((err) => {
        console.log(err);
        throw new BadRequestException('Sorry Try Again Later!');
      }),
    );
  }
  public updateOrder(
    orderData: IOrder,
    orderId: string,
  ): Observable<orderDocument> {
    return of(true).pipe(
      switchMap(() =>
        this.orderModel.findByIdAndUpdate(
          new Types.ObjectId(orderId),
          orderData,
          {
            new: true,
          },
        ),
      ),
      map((updatedOrder) => updatedOrder),
      catchError(() => {
        throw new BadRequestException('Cannot update order now!');
      }),
    );
  }
}
