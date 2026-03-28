import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  const excludedUrls = ['/auth/login', '/auth/register'];

  if (
    !token ||
    token === 'null' ||
    token === 'undefined' ||
    excludedUrls.some(url => req.url.includes(url))
  ) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};