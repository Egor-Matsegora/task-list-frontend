import { createAction } from '@ngrx/store';
import { AuthActionTypes } from './auth-action-types.enum';

export const clearAuthErrorAction = createAction(AuthActionTypes.AUTH_CLEAR_ERROR);
export const clearAuthMessageAction = createAction(AuthActionTypes.AUTH_CLEAR_MESSAGE);
