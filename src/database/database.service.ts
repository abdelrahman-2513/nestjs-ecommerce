import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Observable, map, of, switchMap } from 'rxjs';
import { CreateProductDTO } from 'src/product/dtos/create-product.dto';

@Injectable()
export class DatabaseService {
  public findAllCollection(collectionName: any) {
    return (
      of(true).pipe(switchMap(() => collectionName.find({}))), map((res) => res)
    );
  }
  public findDocumentById(collectionName: any, id: Types.ObjectId) {
    return (
      of(true).pipe(switchMap(() => collectionName.findById(id))),
      map((res) => res)
    );
  }
  public findByName(collectionName: any, name: string, feild: string) {
    return (
      of(true).pipe(switchMap(() => collectionName.find({ feild: name }))),
      map((res) => res)
    );
  }
  public updateDocument(collectionName: any, id: Types.ObjectId, data: object) {
    return (
      of(true).pipe(
        switchMap(() => collectionName.findByIdAndUpdate(id, data)),
      ),
      map((res) => res)
    );
  }
  public createDocument<T>( data:CreateProductDTO) {
    // return (
    //   of(true).pipe(switchMap(() => productModel.create(data))),
    //   map((res) => res)
    // );
  }
  public deleteDocument(collectionName: any, id: Types.ObjectId) {
    return (
      of(true).pipe(switchMap(() => collectionName.findByIdAndDelete(id))),
      map((res) => {
        return;
      })
    );
  }
}
