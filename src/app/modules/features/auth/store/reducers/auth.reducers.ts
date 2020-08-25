import { createReducer, on, Action } from '@ngrx/store';
import { LoginActions, AuthActions, GetUserActions, RegistrationActions, ChangeUserActions } from './../actions';
import { AuthState } from './../state';

export const initialAuthState: AuthState = {
  authLoading: false,
  authError: null,
  authMessage: null,
  user: null,
  isLogedIn: false,
};

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
        isLogedIn: true,
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
        isLogedIn: false,
      };
    }
  ),
  on(
    LoginActions.logoutAction,
    (state): AuthState => {
      return {
        ...state,
        authLoading: false,
        isLogedIn: false,
      };
    }
  ),
  // get user info
  on(
    GetUserActions.getUserSuccessAction,
    (state, { user }): AuthState => {
      return {
        ...state,
        user,
        isLogedIn: true,
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
        isLogedIn: false,
        authError: error,
      };
    }
  ),
  // registration
  on(
    RegistrationActions.registrationAction,
    (state, { user }): AuthState => {
      return {
        ...state,
        authLoading: true,
      };
    }
  ),
  on(
    RegistrationActions.registrationSuccessAction,
    (state, { message }): AuthState => {
      return {
        ...state,
        authLoading: false,
        authMessage: message,
        authError: null,
      };
    }
  ),
  on(
    RegistrationActions.registrationFailureAction,
    (state, { error }): AuthState => {
      return {
        ...state,
        authLoading: true,
        authError: error,
      };
    }
  ),
  // change user
  on(ChangeUserActions.changeUserAction, (state): AuthState => ({ ...state, authLoading: true })),
  on(
    ChangeUserActions.changeUserSuccessAction,
    (state, { user }): AuthState => ({ ...state, user, authLoading: false })
  ),
  on(ChangeUserActions.changeUserFailureAction, (state): AuthState => ({ ...state, authLoading: false })),
  on(ChangeUserActions.changeUserImageAction, (state): AuthState => ({ ...state, authLoading: true })),
  on(
    ChangeUserActions.changeUserImageSuccessAction,
    (state, { user }): AuthState => ({ ...state, user, authLoading: false })
  ),
  on(ChangeUserActions.changeUserImageFailureAction, (state): AuthState => ({ ...state, authLoading: false })),
  on(ChangeUserActions.changeUserPasswordAction, (state): AuthState => ({ ...state, authLoading: true })),
  on(
    ChangeUserActions.changeUserPasswordSuccessAction,
    (state, { user }): AuthState => ({ ...state, user, authLoading: false })
  ),
  on(ChangeUserActions.changeUserPasswordFailureAction, (state): AuthState => ({ ...state, authLoading: false })),
  // messages
  on(AuthActions.clearAuthErrorAction, (state): AuthState => ({ ...state, authError: null })),
  on(AuthActions.clearAuthMessageAction, (state): AuthState => ({ ...state, authMessage: null })),
  // token
  on(AuthActions.setAuthStatusAction, (state, { isLogedIn }): AuthState => ({ ...state, isLogedIn }))
);

export function authReducer(state: AuthState, action: Action) {
  return reducers(state, action);
}
