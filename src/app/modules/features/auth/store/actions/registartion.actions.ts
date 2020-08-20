import { createAction, props } from '@ngrx/store';
import { AuthActionTypes } from './auth-action-types.enum';
import { RegistrationUser } from '@interfaces/registration-user.inerface';

export const registrationAction = createAction(AuthActionTypes.REGISTRATION, props<{ user: RegistrationUser }>());

export const registrationSuccessAction = createAction(
  AuthActionTypes.REGISTRATION_SUCESS,
  props<{ message: string }>()
);

export const registrationFailureAction = createAction(AuthActionTypes.REGISTRATION_FAILURE, props<{ error: string }>());
