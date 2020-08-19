import { UserService } from '@features/user/services/user.service';
import { StorageService } from '@shared/services/storage.service';
import { handleHttpError } from '@helpers/handle-http-error';
import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { GetUserActions } from '../actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class GetUserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GetUserActions.getUserAction),
      mergeMap(() => {
        return this.userService.getUserInfo().pipe(
          map((user) => {
            return GetUserActions.getUserSuccessAction({ user });
          }),
          catchError(({ error }) => {
            return of(GetUserActions.getUserFailureAction({ error: handleHttpError(error) }));
          })
        );
      })
    );
  });
}
