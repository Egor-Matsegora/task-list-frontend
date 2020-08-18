import { createReducer, on, Action } from '@ngrx/store';
import { initialAuthState } from './../state/auth.state';
import { LoginActions, AuthActions, GetUserActions } from './../actions';
import { AuthState } from './../state/auth-state.interface';

const reducers = createReducer(
  initialAuthState,
  // login
  on(
    LoginActions.loginAction,
    (state, { request }): AuthState => {
      return {
        ...state,
        authLoading: true,
      };
    }
  ),
  on(
    LoginActions.loginSuccessAction,
    (state, { response }): AuthState => {
      const authMessage = `Добро пожаловать ${response.user.firstName} ${response.user.lastName}`;
      return {
        ...state,
        authLoading: false,
        authError: null,
        authMessage,
        user: response.user,
        token: response.token,
        loginStaus: true,
      };
    }
  ),
  on(
    LoginActions.loginFailureAction,
    (state, { error }): AuthState => {
      return {
        ...state,
        authLoading: false,
        authError: error,
        authMessage: null,
        loginStaus: false,
      };
    }
  ),
  on(
    LoginActions.logoutAction,
    (state): AuthState => {
      return {
        ...state,
        authLoading: false,
      };
    }
  ),
  // get user info
  on(
    GetUserActions.getUserSuccessAction,
    (state, { user, token }): AuthState => {
      return {
        ...state,
        user,
        token,
        loginStaus: true,
        authError: null,
      };
    }
  ),
  on(
    GetUserActions.getUserFailureAction,
    (state, { error }): AuthState => {
      return {
        ...state,
        user: null,
        token: null,
        loginStaus: false,
        authError: error,
      };
    }
  ),
  // messages
  on(AuthActions.clearAuthErrorAction, (state): AuthState => ({ ...state, authError: null })),
  on(AuthActions.clearAuthMessageAction, (state): AuthState => ({ ...state, authMessage: null }))
);

export function authReducer(state: AuthState, action: Action) {
  return reducers(state, action);
}
