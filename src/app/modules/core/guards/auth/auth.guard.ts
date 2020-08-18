import { mergeMap } from 'rxjs/operators';
import { getAuthLoginStatus, getAuthToken } from '@features/auth/store/state/auth.state';
import { Store, select } from '@ngrx/store';
import { AuthService } from '../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginActions } from '@app/modules/features/auth/store/actions';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private store: Store, private router: Router, private authService: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(getAuthToken),
      mergeMap((token) => {
        const status = !!token;
        // !status && this.store.dispatch(LoginActions.logoutAction());

        return of(status);
      })
    );
  }
  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(next, state);
  }
}
