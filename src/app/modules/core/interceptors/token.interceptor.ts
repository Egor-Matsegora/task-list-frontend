import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this.authService.isLoggedIn()) {
      req = req.clone({
        setHeaders: { Authorization: this.authService.getToken() }
      });
    }
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => this.handleAuthError(err)));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<HttpErrorResponse> {
    if (err.status === 401 && this.authService.isLoggedIn()) {
      this.authService.logout();
      this.toastr.warning('Время сессии истекло, авторизируйтесь еще раз');
    }

    return throwError(err);
  }
}
