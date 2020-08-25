import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './';
import { RootState } from '@core/store/state/root-state.interface';

export interface State extends RootState {
  tasks: TasksState;
}

const getTasksFeatureState = createFeatureSelector<TasksState>('tasks');

export const getTasks = createSelector(getTasksFeatureState, (state) => state.tasks);

export const getSelectedTask = createSelector(getTasksFeatureState, (state) => state.selectedTask);

export const getPageLoading = createSelector(getTasksFeatureState, (state) => state.pageLoading);

export const getTaskLoading = createSelector(getTasksFeatureState, (state) => state.itemLoading);

export const getError = createSelector(getTasksFeatureState, (state) => state.error);

export const getTasksSuccessMessage = createSelector(getTasksFeatureState, (state) => state.successMessage);

export const getTaskDeleteMessage = createSelector(getTasksFeatureState, (state) => state.deleteMessage);

export const getEmptyTasksState = createSelector(getTasksFeatureState, (state) => !state.tasks.length);

export const getAnimationState = createSelector(getTasksFeatureState, (state) => state.disableAnimation);

export const getDoneTasksState = createSelector(getTasksFeatureState, (state) =>
  state.tasks.filter((task) => task.done)
);
