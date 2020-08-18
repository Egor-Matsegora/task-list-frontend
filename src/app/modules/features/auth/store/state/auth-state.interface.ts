import { User } from '@interfaces/user.interface';

export interface AuthState {
  loginStaus: boolean;
  authLoading: boolean;
  authError: string | null;
  authMessage: string | null;
  token: string | null;
  user: User | null;
}
