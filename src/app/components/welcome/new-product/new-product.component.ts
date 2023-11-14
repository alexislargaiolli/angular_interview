import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ProductsService } from '../../../services/products.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    PaginatorModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    ToastModule,
    InputMaskModule,
  ],
  providers: [MessageService],
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProductComponent {
  productForm = new FormGroup({
    productName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(50)],
    }),
    productId: new FormControl<number | null>(null, {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d{13}$/)],
    }),
    productManager: new FormControl<string>('', Validators.maxLength(30)),
    salesStartDate: new FormControl<Date>(new Date(), Validators.required),
  });

  constructor(
    private productService: ProductsService,
    private messageService: MessageService,
  ) {}

  onSubmit() {
    if (this.productForm.valid) {
      this.productService
        .addProduct(
          this.productForm.controls.productName.value,
          this.productForm.controls.productId.value as number,
        )
        .subscribe(() => {
          this.productForm.reset();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product created',
          });
        });
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}
