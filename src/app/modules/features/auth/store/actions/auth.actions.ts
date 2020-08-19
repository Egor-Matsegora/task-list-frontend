import { createAction, props } from '@ngrx/store';
import { AuthActionTypes } from './auth-action-types.enum';

export const clearAuthErrorAction = createAction(AuthActionTypes.AUTH_CLEAR_ERROR);
export const clearAuthMessageAction = createAction(AuthActionTypes.AUTH_CLEAR_MESSAGE);
export const getAuthStatusAction = createAction(AuthActionTypes.GET_AUTH_STATUS);
export const setAuthStatusAction = createAction(AuthActionTypes.SET_AUTH_STATUS, props<{ isLogedIn: boolean }>());
