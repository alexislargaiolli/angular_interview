import { Injectable, signal } from '@angular/core';
import { ProductsApiService } from './products-api.service';
import { Product, ProductColumn } from '../models/product.model';

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

  get products() {
    return this._products.asReadonly();
  }

  get columns() {
    return this._columns.asReadonly();
  }
}
