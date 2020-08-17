import { User } from '@interfaces/user.interface';

export interface AuthState {
  loginStaus: boolean;
  token: string | null;
  authLoading: boolean;
  authError: string | null;
  authMessage: string | null;
  user: User | null;
}
