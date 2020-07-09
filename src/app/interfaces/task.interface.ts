import { User } from '@interfaces/user.interface';

export interface Task {
  title: string;
  description?: string;
  done: boolean;
  date: Date;
  user: User;
  _id?: string;
}
