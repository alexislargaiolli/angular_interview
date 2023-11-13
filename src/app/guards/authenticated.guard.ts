import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { take, tap } from 'rxjs';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.authenticated$.pipe(
    take(1),
    tap((authenticated) => {
      if (!authenticated) {
        router.navigate(['sign-in']);
      }
    }),
  );
};
