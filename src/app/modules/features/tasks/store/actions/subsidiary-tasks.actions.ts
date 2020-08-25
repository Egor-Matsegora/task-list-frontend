import { createAction, props } from '@ngrx/store';
import { TasksActionTypes } from './tasks-action-types.enum';
import { Task } from '@interfaces/task.interface';

// select task for modal
export const selectTaskAction = createAction(TasksActionTypes.SELECT_TASK, props<{ task: Task }>());

export const unselectTaskAction = createAction(TasksActionTypes.UNSELECT_TASK);

// clear task success and delete messages
export const clearTasksMessagesAction = createAction(TasksActionTypes.CLEAR_TASK_MESSAGES);

// animations
export const disableTasksAnimationsAction = createAction(TasksActionTypes.DISABLE_TASKS_ANIMATIONS);

export const enableTasksAnimationsAction = createAction(TasksActionTypes.ENABLE_TASKS_ANIMATIONS);
