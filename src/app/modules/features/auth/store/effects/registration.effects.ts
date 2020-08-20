import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AuthService } from '@core/services/auth/auth.service';
import { LoginActions, AuthActions, RegistrationActions } from '../actions';
import { handleHttpError } from '@helpers/handle-http-error';

@Injectable()
export class RegistrationEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

  registration$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RegistrationActions.registrationAction),
      mergeMap((action) => {
        return this.authService.registration(action.user).pipe(
          map((response) => {
            const message = 'Регистрация прошла успешно, теперь вы можете войти';
            return RegistrationActions.registrationSuccessAction({ message });
          }),
          catchError(({ error }) => {
            return of(RegistrationActions.registrationFailureAction({ error: handleHttpError(error) }));
          })
        );
      })
    );
  });

  redirectonOnSucessRegistration$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RegistrationActions.registrationSuccessAction),
        tap(() => this.router.navigate(['auth', 'login']))
      );
    },
    { dispatch: false }
  );
}
