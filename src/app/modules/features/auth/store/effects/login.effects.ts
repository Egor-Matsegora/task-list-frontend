import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';

import { StorageService } from '@shared/services/storage.service';
import { AuthService } from '@core/services/auth/auth.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginActions, AuthActions } from '../actions';

import { handleHttpError } from '@helpers/handle-http-error';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.loginAction),
      mergeMap((action) => {
        return this.authService.login(action.request).pipe(
          map((response) => {
            this.storageService.set('token', response.token);
            return LoginActions.loginSuccessAction({ response });
          }),
          catchError(({ error }) => {
            return of(LoginActions.loginFailureAction({ error: handleHttpError(error) }));
          })
        );
      })
    );
  });

  redirectonSucessLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LoginActions.loginSuccessAction),
        tap(() => this.router.navigate(['/system']))
      );
    },
    { dispatch: false }
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(LoginActions.logoutAction),
        tap(() => this.storageService.delete('token')),
        tap(() => this.router.navigateByUrl('/'))
      );
    },
    { dispatch: false }
  );

  getAuthStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.getAuthStatusAction),
      mergeMap(() => {
        const status = !!this.storageService.get('token');
        return of(AuthActions.setAuthStatusAction({ isLogedIn: status }));
      })
    );
  });
}
