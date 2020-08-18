import { LoginResponse } from '@interfaces/login-response.interface';
import { AuthActionTypes } from './auth-action-types.enum';
import { createAction, props } from '@ngrx/store';
import { LoginRequest } from '@app/interfaces/login-request.interface';

export const loginAction = createAction(AuthActionTypes.LOGIN, props<{ request: LoginRequest }>());

export const loginSuccessAction = createAction(AuthActionTypes.LOGIN_SUCESS, props<{ response: LoginResponse }>());

export const loginFailureAction = createAction(AuthActionTypes.LOGIN_FAILURE, props<{ error: string }>());

export const logoutAction = createAction(AuthActionTypes.LOGOUT);
