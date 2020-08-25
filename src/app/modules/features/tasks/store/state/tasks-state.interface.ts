import { Task } from '@interfaces/task.interface';

export interface TasksState {
  tasks: Task[];
  selectedTask: Task | null;
  pageLoading: boolean;
  itemLoading: boolean;
  error: string | null;
  successMessage: string | null;
  deleteMessage: string | null;
  disableAnimation: boolean;
}
