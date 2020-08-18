import { User } from '@interfaces/user.interface';
export interface LoginResponse {
  token: string;
  user: User;
}
