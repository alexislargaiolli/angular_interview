import { TestBed } from '@angular/core/testing';

import { ProductsApiService } from './products-api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ProductsApiService', () => {
  let service: ProductsApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('getProducts', () => {
    it('should return the content of potato_sales.json file', () => {
      service.getProducts().subscribe();
      const req = httpTestingController.expectOne('/assets/potato_sales.json');
      req.flush({});
    });
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
});
