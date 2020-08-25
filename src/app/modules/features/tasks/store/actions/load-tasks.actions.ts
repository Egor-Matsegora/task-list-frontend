import { createAction, props } from '@ngrx/store';
import { TasksActionTypes } from './tasks-action-types.enum';
import { Task } from '@interfaces/task.interface';

export const loadTasksAction = createAction(TasksActionTypes.LOAD_TASKS);

export const loadTasksSuccessAction = createAction(TasksActionTypes.LOAD_TASKS_SUCCESS, props<{ tasks: Task[] }>());

export const loadTasksFailureAction = createAction(TasksActionTypes.LOAD_TASKS_FAILURE, props<{ error: string }>());
