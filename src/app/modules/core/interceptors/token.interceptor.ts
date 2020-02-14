import { AuthService } from '../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this.authService.isLoggedIn()) {
      req = req.clone({
        setHeaders: { Authorization: this.authService.getToken() }
      });
    }
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => this.handleAuthError(err)));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<HttpErrorResponse> {
    if (err.status === 401) {
      this.authService.logout();
      this.router.navigate(['auth', 'login']);
    }

    return throwError(err);
  }
}
