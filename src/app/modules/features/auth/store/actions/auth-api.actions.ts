import { AuthActionTypes } from './auth-action-types.enum';
import { createAction, props } from '@ngrx/store';
import { RegistrationUser } from '@interfaces/registration-user.inerface';
import { LoginUser } from '@interfaces/login-user.interface';

export const loginAction = createAction(AuthActionTypes.LOGIN, props<{ user: LoginUser }>());

export const registrationAction = createAction(AuthActionTypes.REGISTRATION, props<{ user: RegistrationUser }>());
