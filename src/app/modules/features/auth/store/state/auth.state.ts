import { createFeatureSelector, createSelector, createAction } from '@ngrx/store';
import { RootState } from '@core/store/state/root-state.interface';
import { AuthState } from './auth-state.interface';

export const initialAuthState: AuthState = {
  loginStaus: false,
  authLoading: false,
  authError: null,
  authMessage: null,
  token: null,
  user: null,
};

export interface State extends RootState {
  auth: AuthState;
}

const getAuthFeatureState = createFeatureSelector<AuthState>('auth');

export const getAuthLoading = createSelector(getAuthFeatureState, (state) => state.authLoading);

export const getAuthError = createSelector(getAuthFeatureState, (state) => state.authError);

export const getAuthMessage = createSelector(getAuthFeatureState, (state) => state.authMessage);

export const getAuthUser = createSelector(getAuthFeatureState, (state) => state.user);

export const getAuthLoginStatus = createSelector(getAuthFeatureState, (state) => !!state.token);

export const getAuthToken = createSelector(getAuthFeatureState, (state) => state.token);
