import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, TabMenuModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {
  navItems: MenuItem[] = [
    { label: 'Sales', icon: 'pi pi-fw pi-align-justify', routerLink: 'sales' },
    {
      label: 'New Product',
      icon: 'pi pi-fw pi-plus',
      routerLink: 'new-product',
    },
  ];
}
