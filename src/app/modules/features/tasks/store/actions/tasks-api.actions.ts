import { createAction, props } from '@ngrx/store';
import { TasksActionTypes } from './tasks-action-types.enum';
import { Task } from '@interfaces/task.interface';

export const loadTasks = createAction(TasksActionTypes.LOAD_TASKS);

export const createTask = createAction(TasksActionTypes.CREATE_TASK, props<{ task: Task }>());

export const updateTask = createAction(TasksActionTypes.UPDATE_TASK, props<{ task: Task }>());

export const doneTask = createAction(TasksActionTypes.DONTE_TASK, props<{ task: Task }>());

export const deleteTask = createAction(TasksActionTypes.DELETE_TASK, props<{ task: Task }>());
