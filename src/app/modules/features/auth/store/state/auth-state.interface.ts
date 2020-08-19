import { User } from '@interfaces/user.interface';

export interface AuthState {
  authLoading: boolean;
  authError: string | null;
  authMessage: string | null;
  user: User | null;
  isLogedIn: boolean;
}
