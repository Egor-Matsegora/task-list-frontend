import { createAction, props } from '@ngrx/store';
import { TasksActionTypes } from './tasks-action-types.enum';
import { Task } from '@interfaces/task.interface';

// delete tasks
export const deleteTaskAction = createAction(TasksActionTypes.DELETE_TASK, props<{ task: Task }>());

export const deleteTasksSuccessAction = createAction(
  TasksActionTypes.DELETE_TASK_SUCCESS,
  props<{ task: Task; deleteMessage: string }>()
);

export const deleteTasksFailureAction = createAction(TasksActionTypes.DELETE_TASK_FAILURE, props<{ error: string }>());

// delete multiple tasks
export const deleteMultipleTasksAction = createAction(
  TasksActionTypes.DELETE_MULTIPLE_TASKS,
  props<{ tasks: Task[] }>()
);

export const deleteMultipleTasksSuccessAction = createAction(
  TasksActionTypes.DELETE_MULTIPLE_TASKS_SUCCESS,
  props<{ tasks: Task[]; deleteMessage: string }>()
);

export const deleteMultipleTasksFailureAction = createAction(
  TasksActionTypes.DELETE_MULTIPLE_TASKS_FAILURE,
  props<{ error: string }>()
);
