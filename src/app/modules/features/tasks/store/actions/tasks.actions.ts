import { createAction, props } from '@ngrx/store';
import { TasksActionTypes } from './tasks-action-types.enum';
import { Task } from '@interfaces/task.interface';

// load tasks
export const loadTasksSuccess = createAction(TasksActionTypes.LOAD_TASKS_SUCCESS, props<{ tasks: Task[] }>());

export const loadTasksFailure = createAction(TasksActionTypes.LOAD_TASKS_FAILURE, props<{ error: string }>());

// create task
export const createTaskSuccess = createAction(
  TasksActionTypes.CREATE_TASK_SUCCESS,
  props<{ task: Task; successMessage: string }>()
);

export const createTaskFailure = createAction(TasksActionTypes.CREATE_TASK_FAILURE, props<{ error: string }>());

// update task
export const updateTaskSuccess = createAction(
  TasksActionTypes.UPDATE_TASK_SUCCESS,
  props<{ task: Task; successMessage: string }>()
);

export const updateTaskFailure = createAction(TasksActionTypes.CREATE_TASK_FAILURE, props<{ error: string }>());

// done/undone task
export const doneTaskSuccess = createAction(TasksActionTypes.DONE_TASK_SUCCESS, props<{ task: Task }>());

export const doneTaskFailure = createAction(TasksActionTypes.DONE_TASK_FAILURE, props<{ error: string }>());

// delete task
export const deleteTasksSuccess = createAction(
  TasksActionTypes.DELETE_TASK_SUCCESS,
  props<{ task: Task; deleteMessage: string }>()
);

export const deleteTasksFailure = createAction(TasksActionTypes.DELETE_TASK_FAILURE, props<{ error: string }>());

// delete multiple tasks
export const deleteMultipleTasksSuccess = createAction(
  TasksActionTypes.DELETE_MULTIPLE_TASKS_SUCCESS,
  props<{ tasks: Task[]; deleteMessage: string }>()
);

export const deleteMultipleTasksFailure = createAction(
  TasksActionTypes.DELETE_MULTIPLE_TASKS_FAILURE,
  props<{ error: string }>()
);

// select task for modal
export const selectTask = createAction(TasksActionTypes.SELECT_TASK, props<{ task: Task }>());

export const unselectTask = createAction(TasksActionTypes.UNSELECT_TASK);

// clear task success and delete messages
export const clearTasksMessages = createAction(TasksActionTypes.CLEAR_TASK_MESSAGES);

// animations
export const disableTasksAnimations = createAction(TasksActionTypes.DISABLE_TASKS_ANIMATIONS);

export const enableTasksAnimations = createAction(TasksActionTypes.ENABLE_TASKS_ANIMATIONS);
