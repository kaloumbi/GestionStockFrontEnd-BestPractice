import { Observable } from 'rxjs';

import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { TokenService } from '../service/token.service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authToken = inject(TokenService).getToken("auth-token");
  

  if (!req.url.includes("/auth/signin")) {
    
    if (authToken) {
      const newReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return next(newReq);
    }
  }
  return next(req);
  
}
