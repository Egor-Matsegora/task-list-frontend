import { createReducer, on, Action } from '@ngrx/store';
import * as TasksActions from '../actions';
import { TasksState } from '../state';

export const initialTasksState: TasksState = {
  tasks: [],
  selectedTask: null,
  pageLoading: false,
  itemLoading: false,
  error: null,
  successMessage: null,
  deleteMessage: null,
  disableAnimation: true,
};

const reducer = createReducer(
  initialTasksState,
  // load tasks
  on(TasksActions.loadTasksAction, (state) => ({ ...state, pageLoading: true })),
  on(
    TasksActions.loadTasksSuccessAction,
    (state, { tasks }): TasksState => ({ ...state, tasks, pageLoading: false, error: null })
  ),
  on(TasksActions.loadTasksFailureAction, (state, { error }): TasksState => ({ ...state, error, pageLoading: false })),
  // create task
  on(TasksActions.createTaskAction, (state, { title, description }): TasksState => ({ ...state, itemLoading: true })),
  on(
    TasksActions.createTaskSuccessAction,
    (state, { task, successMessage }): TasksState => {
      return {
        ...state,
        successMessage,
        itemLoading: false,
        error: null,
        tasks: [...state.tasks, task],
      };
    }
  ),
  on(TasksActions.createTaskFailureAction, (state, { error }): TasksState => ({ ...state, error, itemLoading: false })),
  // update task
  on(TasksActions.updateTaskAction, (state, { task }): TasksState => ({ ...state, itemLoading: true })),
  on(
    TasksActions.updateTaskSuccessAction,
    (state, { task, successMessage }): TasksState => {
      return {
        ...state,
        successMessage,
        error: null,
        itemLoading: false,
        selectedTask: null,
        tasks: state.tasks.map((item) => {
          return item._id === task._id ? task : item;
        }),
      };
    }
  ),
  on(TasksActions.updateTaskFailureAction, (state, { error }): TasksState => ({ ...state, error, itemLoading: false })),
  // delete task
  on(
    TasksActions.deleteTasksSuccessAction,
    (state, { task, deleteMessage }): TasksState => {
      return {
        ...state,
        deleteMessage,
        error: null,
        tasks: state.tasks.filter((item) => item._id !== task._id),
      };
    }
  ),
  on(TasksActions.deleteTasksFailureAction, (state, { error }): TasksState => ({ ...state, error })),
  // delete multiple tasks
  on(
    TasksActions.deleteMultipleTasksSuccessAction,
    (state, { tasks, deleteMessage }): TasksState => {
      return {
        ...state,
        deleteMessage,
        tasks: state.tasks.filter((task) => !task.done),
        error: null,
      };
    }
  ),
  on(TasksActions.deleteMultipleTasksFailureAction, (state, { error }): TasksState => ({ ...state, error })),
  // done task
  on(
    TasksActions.doneTaskSuccessAction,
    (state, { task }): TasksState => {
      return {
        ...state,
        error: null,
        tasks: state.tasks.map((item) => {
          return item._id === task._id ? task : item;
        }),
      };
    }
  ),
  on(TasksActions.doneTaskFailureAction, (state, { error }): TasksState => ({ ...state, error })),
  // select/unselect task for modal
  on(TasksActions.selectTaskAction, (state, { task }): TasksState => ({ ...state, selectedTask: task })),
  on(TasksActions.unselectTaskAction, (state): TasksState => ({ ...state, selectedTask: null })),
  // clear messages
  on(
    TasksActions.clearTasksMessagesAction,
    (state): TasksState => ({ ...state, successMessage: null, deleteMessage: null, error: null })
  ),
  // animations
  on(TasksActions.disableTasksAnimationsAction, (state): TasksState => ({ ...state, disableAnimation: true })),
  on(TasksActions.enableTasksAnimationsAction, (state): TasksState => ({ ...state, disableAnimation: false }))
);

export function tasksReducer(state: TasksState | undefined, action: Action) {
  return reducer(state, action);
}
