import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authenticatedGuard} from "./guards/authenticated.guard";

const routes: Routes = [{
  path: '',
  loadComponent: () => import('./components/welcome/welcome.component').then(m => m.WelcomeComponent),
  canActivate: [authenticatedGuard],
}, {
  path: 'sign-in',
  loadComponent: () => import('./components/sign-in/sign-in.component').then(m => m.SignInComponent),
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
