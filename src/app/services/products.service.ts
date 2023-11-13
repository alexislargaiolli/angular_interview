import { Injectable, signal } from '@angular/core';
import { ProductsApiService } from './products-api.service';
import { Product, ProductColumn } from '../models/product.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _products = signal<Product[]>([]);
  private _columns = signal<ProductColumn[]>([]);

  constructor(private productsApiService: ProductsApiService) {}

  public loadProducts() {
    this.productsApiService.getProducts().subscribe((products) => {
      this._products.set(products.data);
      this._columns.set(products.column);
    });
  }

  public addProduct(
    productName: string,
    productID: number,
  ): Observable<Product> {
    const product = {
      productName,
      productID,
      salesQ1: 0,
      salesQ2: 0,
      salesQ3: 0,
      salesQ4: 0,
    } as Product;
    this._products.update((products) => {
      return [...products, product];
    });
    return of(product);
  }

  get products() {
    return this._products.asReadonly();
  }

  get columns() {
    return this._columns.asReadonly();
  }
}
