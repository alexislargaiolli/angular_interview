import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsDto } from './dto/products.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get<ProductsDto>('/assets/potato_sales.json');
  }
}
