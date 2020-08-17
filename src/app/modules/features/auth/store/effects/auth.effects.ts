import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthService } from '@core/services/auth/auth.service';
import { AuthActions, AuthApiActions } from '../actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthApiActions.loginAction),
      concatMap((action) => {
        return this.authService.login(action.user).pipe(
          map((response) => AuthActions.loginSuccessAction({ response })),
          catchError(({ success, message }) => {
            console.log('error');

            return of(AuthActions.loginFailureAction({ success, message }));
          })
        );
      })
    );
  });

  // registration$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(AuthApiActions.registrationAction),
  //     concatMap((action) => {
  //       return this.authService.login(action.user).pipe(
  //         map((success) => AuthActions.registrationSuccessAction({ success })),
  //         catchError(({ success, message }) => of(AuthActions.registrationFailureAction({ success, message })))
  //       );
  //     })
  //   );
  // });
}
