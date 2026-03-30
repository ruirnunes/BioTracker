import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  const excludedUrls = new Set([
    '/auth/login',
    '/auth/register'
  ]);

  // normalize path
  const requestPath = new URL(req.url, 'http://dummy-base').pathname;

  const isExcluded = excludedUrls.has(requestPath);

  const isInvalidToken =
    !token ||
    token === 'null' ||
    token === 'undefined';

  if (isExcluded || isInvalidToken) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};