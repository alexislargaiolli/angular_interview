import { ProductsService } from './products.service';
import {
  createServiceFactory,
  mockProvider,
  SpectatorService,
} from '@ngneat/spectator';
import { ProductsApiService } from './products-api.service';
import { of } from 'rxjs';

describe('ProductsService', () => {
  let spectator: SpectatorService<ProductsService>;
  const createService = createServiceFactory({
    service: ProductsService,
    providers: [mockProvider(ProductsApiService)],
  });
  const data = {
    column: [
      { header: 'Product ID', field: 'productID' },
      { header: 'Product name', field: 'productName' },
      {
        header: 'Sales',
        subHeaders: [
          { header: '2022Q1', field: 'salesQ1' },
          { header: '2022Q2', field: 'salesQ2' },
          { header: '2022Q3', field: 'salesQ3' },
          { header: '2022Q4', field: 'salesQ4' },
        ],
      },
      { header: 'Total sales' },
    ],
    data: [
      {
        productID: '5068764589210',
        productName: 'Yukon Gold Potatos',
        salesQ1: 1,
        salesQ2: 1,
        salesQ3: 1,
        salesQ4: 1,
      },
    ],
  };

  beforeEach(() => {
    spectator = createService();
    spectator.inject(ProductsApiService).getProducts.andReturn(of(data));
  });

  describe('loadProducts', () => {
    beforeEach(() => {
      spectator.service.loadProducts();
    });

    it('should call loadProduct from api service', () => {
      expect(
        spectator.inject(ProductsApiService).getProducts,
      ).toHaveBeenCalled();
    });

    it('should init products', () => {
      expect(spectator.service.products().length).toBeGreaterThan(0);
    });

    it('should init columns', () => {
      expect(spectator.service.columns().length).toBeGreaterThan(0);
    });
  });

  describe('products', () => {
    beforeEach(() => {
      spectator.service.loadProducts();
    });

    it('should compute total sales', () => {
      expect(spectator.service.products()[0].totalSales).toEqual(4);
    });
  });

  describe('columns', () => {
    beforeEach(() => {
      spectator.service.loadProducts();
    });

    it('should add totalSales field', () => {
      const totalSalesColumn = spectator.service
        .columns()
        .find((column) => column.header === 'Total sales');
      expect(totalSalesColumn).toEqual({
        header: 'Total sales',
        field: 'totalSales',
      });
    });
  });
});
