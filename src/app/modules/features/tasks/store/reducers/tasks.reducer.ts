import { createReducer, on, Action } from '@ngrx/store';
import { Task } from '@interfaces/task.interface';
import { TasksActions, TasksApiActions } from '../actions';

export interface TasksState {
  tasks: Task[];
  selectedTask: Task | null;
  pageLoading: boolean;
  itemLoading: boolean;
  error: string | null;
  successMessage: string | null;
  deleteMessage: string | null;
}

export const initialTasksState: TasksState = {
  tasks: [],
  selectedTask: null,
  pageLoading: false,
  itemLoading: false,
  error: null,
  successMessage: null,
  deleteMessage: null,
};

const reducer = createReducer(
  initialTasksState,
  // load tasks
  on(TasksApiActions.loadTasks, (state) => ({ ...state, pageLoading: true })),
  on(
    TasksActions.loadTasksSuccess,
    (state, { tasks }): TasksState => ({ ...state, tasks, pageLoading: false, error: null })
  ),
  on(TasksActions.loadTasksFailure, (state, { error }): TasksState => ({ ...state, error, pageLoading: false })),
  // create task
  on(TasksApiActions.createTask, (state, { task }): TasksState => ({ ...state, itemLoading: true })),
  on(
    TasksActions.createTaskSuccess,
    (state, { task, successMessage }): TasksState => {
      return {
        ...state,
        successMessage,
        itemLoading: false,
        error: null,
        tasks: [task, ...state.tasks],
      };
    }
  ),
  on(TasksActions.createTaskFailure, (state, { error }): TasksState => ({ ...state, error, itemLoading: false })),
  // update task
  on(TasksApiActions.updateTask, (state, { task }): TasksState => ({ ...state, itemLoading: true })),
  on(
    TasksActions.updateTaskSuccess,
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
  on(TasksActions.updateTaskFailure, (state, { error }): TasksState => ({ ...state, error, itemLoading: false })),
  // delete task
  on(
    TasksActions.deleteTasksSuccess,
    (state, { task, deleteMessage }): TasksState => {
      return { ...state, deleteMessage, error: null, tasks: state.tasks.filter((item) => item._id !== task._id) };
    }
  ),
  on(TasksActions.deleteTasksFailure, (state, { error }): TasksState => ({ ...state, error })),
  // done task
  on(
    TasksActions.doneTaskSuccess,
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
  on(TasksActions.doneTaskFailure, (state, { error }): TasksState => ({ ...state, error })),
  // select/unselect task for modal
  on(TasksActions.selectTask, (state, { task }): TasksState => ({ ...state, selectedTask: task })),
  on(TasksActions.unselectTask, (state): TasksState => ({ ...state, selectedTask: null })),
  // clear messages
  on(
    TasksActions.clearTasksMessages,
    (state): TasksState => ({ ...state, successMessage: null, deleteMessage: null, error: null })
  )
);

export function tasksReducer(state: TasksState | undefined, action: Action) {
  return reducer(state, action);
}
