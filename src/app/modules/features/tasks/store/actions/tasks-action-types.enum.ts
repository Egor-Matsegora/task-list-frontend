export enum TasksActionTypes {
  LOAD_TASKS = '[Tasks] Load tasks',
  LOAD_TASKS_SUCCESS = '[Tasks] Load tasks sucess',
  LOAD_TASKS_FAILURE = '[Tasks] Load tasks failure',

  CREATE_TASK = '[Tasks] Create task',
  CREATE_TASK_SUCCESS = '[Tasks] Create task sucess',
  CREATE_TASK_FAILURE = '[Tasks] Create task failure',

  UPDATE_TASK = '[Tasks] Update task',
  UPDATE_TASK_SUCCESS = '[Tasks] Update task sucess',
  UPDATE_TASK_FAILURE = '[Tasks] Update task failure',

  DONTE_TASK = '[Tasks] Task done',
  DONE_TASK_SUCCESS = '[Tasks] Task done sucess',
  DONE_TASK_FAILURE = '[Tasks] Task done failure',

  DELETE_TASK = '[Tasks] Delete task',
  DELETE_TASK_SUCCESS = '[Tasks] Delete task sucess',
  DELETE_TASK_FAILURE = '[Tasks] Delete task failure',

  DELETE_MULTIPLE_TASKS = '[Tasks] Delete multiple tasks',
  DELETE_MULTIPLE_TASKS_SUCCESS = '[Tasks] Delete multiple tasks success',
  DELETE_MULTIPLE_TASKS_FAILURE = '[Tasks] Delete multiple tasks failure',

  SELECT_TASK = '[Tasks] Select Task',
  UNSELECT_TASK = '[Tasks] Unselect Tasks',

  CLEAR_TASK_MESSAGES = '[Task] Clear Tasks messages',

  DISABLE_TASKS_ANIMATIONS = '[Tasks] Disable animations',
  ENABLE_TASKS_ANIMATIONS = '[Tasks] Enable animations',
}
