import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isLoggedIn()) {
      req = req.clone({
        setHeaders: { Authorization: this.authService.getToken().token }
      });
    }
    return next.handle(req);
  }
}
