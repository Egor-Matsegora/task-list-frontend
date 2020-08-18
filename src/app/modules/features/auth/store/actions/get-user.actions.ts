import { User } from '@interfaces/user.interface';
import { AuthActionTypes } from './auth-action-types.enum';
import { createAction, props } from '@ngrx/store';
import { LoginRequest } from '@interfaces/login-request.interface';

export const getUserAction = createAction(AuthActionTypes.GET_USER);

export const getUserSuccessAction = createAction(
  AuthActionTypes.GET_USER_SUCCESS,
  props<{ user: User; token: string }>()
);

export const getUserFailureAction = createAction(AuthActionTypes.GET_USER_FAILURE, props<{ error: string }>());
