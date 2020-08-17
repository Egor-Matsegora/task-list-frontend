import { RootState } from '@core/store/state/root-state.interface';
import { AuthState } from './auth-state.interface';

export const initialAuthState: AuthState = {
  loginStaus: false,
  token: null,
  authLoading: false,
  authError: null,
  authMessage: null,
  user: null,
};

export interface State extends RootState {
  auth: AuthState;
}
