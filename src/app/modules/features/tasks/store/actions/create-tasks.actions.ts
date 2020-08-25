import { createAction, props } from '@ngrx/store';
import { TasksActionTypes } from './tasks-action-types.enum';
import { Task } from '@interfaces/task.interface';

export const createTaskAction = createAction(
  TasksActionTypes.CREATE_TASK,
  props<{ title: string; description?: string }>()
);

export const createTaskSuccessAction = createAction(
  TasksActionTypes.CREATE_TASK_SUCCESS,
  props<{ task: Task; successMessage: string }>()
);

export const createTaskFailureAction = createAction(TasksActionTypes.CREATE_TASK_FAILURE, props<{ error: string }>());
