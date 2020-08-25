import { createAction, props } from '@ngrx/store';
import { TasksActionTypes } from './tasks-action-types.enum';
import { Task } from '@interfaces/task.interface';

// update task
export const updateTaskAction = createAction(TasksActionTypes.UPDATE_TASK, props<{ task: Task }>());

export const updateTaskSuccessAction = createAction(
  TasksActionTypes.UPDATE_TASK_SUCCESS,
  props<{ task: Task; successMessage: string }>()
);

export const updateTaskFailureAction = createAction(TasksActionTypes.CREATE_TASK_FAILURE, props<{ error: string }>());

// done/undone task
export const doneTaskAction = createAction(TasksActionTypes.DONTE_TASK, props<{ task: Task }>());

export const doneTaskSuccessAction = createAction(TasksActionTypes.DONE_TASK_SUCCESS, props<{ task: Task }>());

export const doneTaskFailureAction = createAction(TasksActionTypes.DONE_TASK_FAILURE, props<{ error: string }>());
