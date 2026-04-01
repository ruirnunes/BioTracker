import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  const isValid =
    typeof token === 'string' &&
    token !== 'undefined' &&
    token !== 'null' &&
    token.trim().length > 0;

  if (!isValid) {
    router.navigate(['/auth']);
    return false;
  }

  return true;
};