import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesComponent {
  products = this.productsService.products;
  columns = this.productsService.columns;

  constructor(private productsService: ProductsService) {}

  protected readonly Number = Number;
}
