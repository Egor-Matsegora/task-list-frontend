import { User } from '@interfaces/user.interface';
import { AuthActionTypes } from './auth-action-types.enum';
import { createAction, props } from '@ngrx/store';

export const changeUserAction = createAction(AuthActionTypes.CHANGE_USER, props<{ user: User }>());

export const changeUserSuccessAction = createAction(
  AuthActionTypes.CHANGE_USER_SUCCESS,
  props<{ user: User; message: string }>()
);

export const changeUserFailureAction = createAction(AuthActionTypes.CHANGE_USER_FAILURE, props<{ error: string }>());

export const changeUserImageAction = createAction(AuthActionTypes.CHANGE_USER_IMAGE, props<{ image: File }>());

export const changeUserImageSuccessAction = createAction(
  AuthActionTypes.CHANGE_USER_SUCCESS,
  props<{ user: User; message: string }>()
);

export const changeUserImageFailureAction = createAction(
  AuthActionTypes.CHANGE_USER_IMAGE_FAILURE,
  props<{ error: string }>()
);

export const changeUserPasswordAction = createAction(
  AuthActionTypes.CHANGE_USER_PASSWORD,
  props<{ password: string }>()
);

export const changeUserPasswordSuccessAction = createAction(
  AuthActionTypes.CHANGE_USER_PASSWORD_SUCCESS,
  props<{ user: User; message: string }>()
);

export const changeUserPasswordFailureAction = createAction(
  AuthActionTypes.CHANGE_USER_PASSWORD_FAILURE,
  props<{ error: string }>()
);
