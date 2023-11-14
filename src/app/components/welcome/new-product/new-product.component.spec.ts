import { NewProductComponent } from './new-product.component';
import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { ProductsService } from '../../../services/products.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('NewProductComponent', () => {
  let spectator: Spectator<NewProductComponent>;
  const createComponent = createComponentFactory({
    component: NewProductComponent,
    providers: [mockProvider(ProductsService), mockProvider(MessageService)],
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.inject(ProductsService).addProduct.andReturn(of(''));
  });

  it('should add product on valid form submission', () => {
    spectator.typeInElement('Yukon Gold Potatos', '#productName');
    spectator.typeInElement('1212021212221', '#productId');
    spectator.blur('#productId');
    spectator.typeInElement('John Smith', '#productManager');
    spectator.typeInElement('10/10/2024', '#salesStartDate');
    spectator.click('button[type="submit"]');
    expect(spectator.inject(ProductsService).addProduct).toHaveBeenCalled();
  });

  it('should require product name', () => {
    spectator.typeInElement('5068764589210', '#productId');
    spectator.blur('#productId');
    spectator.typeInElement('John Smith', '#productManager');
    spectator.click('button[type="submit"]');
    expect(spectator.inject(ProductsService).addProduct).not.toHaveBeenCalled();
  });

  it('should require product id', () => {
    spectator.typeInElement('Yukon Gold Potatos', '#productName');
    spectator.typeInElement('John Smith', '#productManager');
    spectator.click('button[type="submit"]');
    expect(spectator.inject(ProductsService).addProduct).not.toHaveBeenCalled();
  });

  it('should require Sales start date', () => {
    spectator.typeInElement('Yukon Gold Potatos', '#productName');
    spectator.typeInElement('5068764589210', '#productId');
    spectator.blur('#productId');
    spectator.typeInElement('John Smith', '#productManager');
    spectator.component.productForm.controls.salesStartDate.setValue(null);
    spectator.click('button[type="submit"]');
    expect(spectator.inject(ProductsService).addProduct).not.toHaveBeenCalled();
  });
});
