export interface ProductsDto {
  column: ProductColumnDto[];
  data: ProductDto[];
}

export interface ProductColumnDto {
  header: string;
  field?: string;
  subHeaders?: {
    header: string;
    field: string;
  }[];
}

export interface ProductDto {
  productID: number;
  productName: string;
  salesQ1: number;
  salesQ2: number;
  salesQ3: number;
  salesQ4: number;
}
