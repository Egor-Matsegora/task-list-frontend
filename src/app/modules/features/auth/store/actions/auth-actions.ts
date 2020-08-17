import { AuthActionTypes } from './auth-action-types.enum';
import { createAction, props } from '@ngrx/store';
import { LoginRequest } from '@interfaces/login-request.interface';

export const loginSuccessAction = createAction(AuthActionTypes.LOGIN_SUCESS, props<{ response: LoginRequest }>());

export const loginFailureAction = createAction(
  AuthActionTypes.LOGIN_FAILURE,
  props<{ success: boolean; message: string }>()
);

export const registrationSuccessAction = createAction(
  AuthActionTypes.REGISTRATION_SUCESS,
  props<{ success: boolean }>()
);

export const registrationFailureAction = createAction(
  AuthActionTypes.REGISTRATION_FAILURE,
  props<{ success: boolean; message: string }>()
);

export const logoutAction = createAction(AuthActionTypes.LOGOUT);
