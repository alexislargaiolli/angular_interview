import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProductsService } from '../../../services/products.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, TableModule, InputTextModule, ButtonModule],
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesComponent {
  products = this.productsService.products;
  columns = this.productsService.columns;
  searchableColumns: Signal<string[]> = computed(() =>
    this.columns()
      .filter((column) => column.field)
      .map((column) => column.field as string),
  );

  constructor(private productsService: ProductsService) {}

  protected readonly Number = Number;
  protected readonly HTMLInputElement = HTMLInputElement;
}
