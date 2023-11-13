import { Routes } from '@angular/router';
import { authenticatedGuard } from './guards/authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/welcome/welcome.component').then(
        (m) => m.WelcomeComponent,
      ),
    children: [
      {
        path: 'new-product',
        loadComponent: () =>
          import('./components/welcome/new-product/new-product.component').then(
            (m) => m.NewProductComponent,
          ),
      },
      {
        path: 'sales',
        loadComponent: () =>
          import('./components/welcome/sales/sales.component').then(
            (m) => m.SalesComponent,
          ),
      },
      {
        path: '',
        redirectTo: 'sales',
        pathMatch: 'full',
      },
    ],
    canActivate: [authenticatedGuard],
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./components/sign-in/sign-in.component').then(
        (m) => m.SignInComponent,
      ),
  },
];
