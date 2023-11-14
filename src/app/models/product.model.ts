import { ProductColumnDto, ProductDto } from '../services/dto/products.dto';

export interface Product extends ProductDto {
  totalSales?: number;
}
export type ProductColumn = ProductColumnDto;
