import { SalesComponent } from './sales.component';
import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { ProductsService } from '../../../services/products.service';
import { signal } from '@angular/core';

describe('SalesComponent', () => {
  let spectator: Spectator<SalesComponent>;
  const columns = [
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
    { header: 'Total sales', field: 'totalSales' },
  ];
  const products = [
    {
      productID: '1',
      productName: 'Yukon Gold Potatos',
      salesQ1: 1,
      salesQ2: 1,
      salesQ3: 1,
      salesQ4: 1,
      totalSales: 4,
    },
  ];
  const createComponent = createComponentFactory({
    component: SalesComponent,
    providers: [
      mockProvider(ProductsService, {
        products: signal(products),
        columns: signal(columns),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should display a table of product', () => {
    expect(spectator.queryAll('tr th')).toHaveText([
      'Product ID',
      'Product name',
      'Sales',
      'Total sales',
      '2022Q1',
      '2022Q2',
      '2022Q3',
      '2022Q4',
    ]);
    expect(spectator.queryAll('tr td')).toHaveText([
      '1',
      'Yukon Gold Potatos',
      '1',
      '1',
      '1',
      '1',
      '4',
      '',
    ]);
  });
});
