import { UserService } from '@features/user/services/user.service';
import { handleHttpError } from '@helpers/handle-http-error';
import { Injectable } from '@angular/core';

import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ChangeUserActions } from '../actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class ChangeUserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  changeUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ChangeUserActions.changeUserAction),
      mergeMap((action) => {
        return this.userService.updateUser(action.user).pipe(
          map((user) => ChangeUserActions.changeUserSuccessAction({ user, message: '' })),
          catchError(({ error }) => {
            return of(ChangeUserActions.changeUserFailureAction({ error: handleHttpError(error) }));
          })
        );
      })
    );
  });

  changeUserImage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ChangeUserActions.changeUserImageAction),
      mergeMap((action) => {
        return this.userService.updateImage(action.image).pipe(
          map((user) => ChangeUserActions.changeUserImageSuccessAction({ user, message: '' })),
          catchError(({ error }) => {
            return of(ChangeUserActions.changeUserImageFailureAction({ error: handleHttpError(error) }));
          })
        );
      })
    );
  });

  changeUserPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ChangeUserActions.changeUserPasswordAction),
      mergeMap((action) => {
        return this.userService.updatePassword(action.password).pipe(
          map((user) => ChangeUserActions.changeUserPasswordSuccessAction({ user, message: '' })),
          catchError(({ error }) => {
            return of(ChangeUserActions.changeUserPasswordFailureAction({ error: handleHttpError(error) }));
          })
        );
      })
    );
  });
}
