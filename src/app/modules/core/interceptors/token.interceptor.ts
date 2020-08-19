import { ToastrService } from 'ngx-toastr';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { LoginActions } from '@app/modules/features/auth/store/actions';
import { StorageService } from '@shared/services/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor, OnDestroy {
  private token: string;
  private isLoggedIn: boolean;
  private subscriptions: Subscription = new Subscription();
  constructor(private store: Store, private toastr: ToastrService, private storageService: StorageService) {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.setStoreVariables();
    if (this.token) {
      req = req.clone({
        setHeaders: { Authorization: this.token },
      });
    }
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => this.handleAuthError(err)));
  }

  private setStoreVariables() {
    this.token = this.storageService.get('token');
    this.isLoggedIn = !!this.token;
  }

  private handleAuthError(err: HttpErrorResponse): Observable<HttpErrorResponse> {
    if (err.status === 401 && this.isLoggedIn) {
      this.store.dispatch(LoginActions.logoutAction());
      this.toastr.warning('Время сессии истекло, авторизируйтесь еще раз');
    }

    return throwError(err);
  }
}
