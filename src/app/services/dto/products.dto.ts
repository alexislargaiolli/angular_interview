export interface ProductsDto {
  columns: HeaderDto[];
  data: ProductDto[];
}

export interface HeaderDto {
  header: string;
  field?: string;
  subHeaders?: {
    header: string;
    field: string;
  }[];
}

export interface ProductDto {
  productID: string;
  productName: string;
  salesQ1: number;
  salesQ2: number;
  salesQ3: number;
  salesQ4: number;
}
