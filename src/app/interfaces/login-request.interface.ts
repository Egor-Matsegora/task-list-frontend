import { User } from '@interfaces/user.interface';
export interface LoginRequest {
  token?: string;
  success: boolean;
  message?: string;
  user?: User;
}
