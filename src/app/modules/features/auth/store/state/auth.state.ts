import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootState } from '@core/store/state/root-state.interface';
import { AuthState } from './auth-state.interface';

export interface State extends RootState {
  auth: AuthState;
}

const getAuthFeatureState = createFeatureSelector<AuthState>('auth');

export const getAuthLoading = createSelector(getAuthFeatureState, (state) => state.authLoading);

export const getAuthError = createSelector(getAuthFeatureState, (state) => state.authError);

export const getAuthMessage = createSelector(getAuthFeatureState, (state) => state.authMessage);

export const getAuthUser = createSelector(getAuthFeatureState, (state) => state.user);

export const getAuthStatus = createSelector(getAuthFeatureState, (state) => state.isLogedIn);
