import { createReducer, on, Action } from '@ngrx/store';
import { initialAuthState } from './../state/auth.state';
import { AuthActions, AuthApiActions } from './../actions';
import { AuthState } from './../state/auth-state.interface';

const reducers = createReducer(
  initialAuthState,
  on(
    AuthApiActions.loginAction,
    (state, { user }): AuthState => {
      return {
        ...state,
        authLoading: true,
      };
    }
  ),
  on(
    AuthActions.loginSuccessAction,
    (state, { response }): AuthState => {
      const authMessage = `Добро пожаловать ${response.user.firstName} ${response.user.lastName}`;
      return {
        ...state,
        authLoading: false,
        authError: null,
        authMessage,
        loginStaus: response.success,
        token: response.token,
        user: response.user,
      };
    }
  ),
  on(
    AuthActions.loginFailureAction,
    (state, { success, message }): AuthState => {
      return {
        ...state,
        authLoading: false,
        authError: message,
        authMessage: null,
        loginStaus: success,
        token: null,
        user: null,
      };
    }
  ),
  on(
    AuthApiActions.registrationAction,
    (state, { user }): AuthState => {
      return {
        ...state,
        authLoading: true,
      };
    }
  ),
  on(
    AuthActions.registrationSuccessAction,
    (state, { success }): AuthState => {
      return {
        ...state,
        authLoading: false,
        authMessage: 'Регистрация прошла успешно, теперь вы можете войти',
        authError: null,
      };
    }
  ),
  on(
    AuthActions.registrationFailureAction,
    (state, { success, message }): AuthState => {
      return {
        ...state,
        authLoading: false,
        authMessage: null,
        authError: message,
      };
    }
  ),
  on(
    AuthActions.logoutAction,
    (state): AuthState => {
      return {
        ...state,
        user: null,
        token: null,
        loginStaus: false,
      };
    }
  )
);

export function authReducer(state: AuthState, action: Action) {
  return reducers(state, action);
}
