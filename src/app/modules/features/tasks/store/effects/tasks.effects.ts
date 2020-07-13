import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { TasksService } from '../../services/tasks/tasks.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TasksActions, TasksApiActions } from '../actions';

@Injectable()
export class TasksEffects {
  constructor(private actions$: Actions, private tasksService: TasksService) {}

  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksApiActions.loadTasks),
      mergeMap(() => {
        return this.tasksService.getTasks().pipe(
          map((tasks) => TasksActions.loadTasksSuccess({ tasks })),
          catchError((err) => of(TasksActions.loadTasksFailure({ error: 'Ошибка загрузки задач' })))
        );
      })
    );
  });

  createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksApiActions.createTask),
      mergeMap((action) => {
        return this.tasksService.createTask({ title: action.title, description: action.description }).pipe(
          map((task) => TasksActions.createTaskSuccess({ task, successMessage: 'Задача успешно создана' })),
          catchError((err) => of(TasksActions.createTaskFailure({ error: 'Ошибка создания задачи' })))
        );
      })
    );
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksApiActions.updateTask),
      mergeMap((action) => {
        return this.tasksService.updateTask(action.task).pipe(
          map((task) => TasksActions.updateTaskSuccess({ task, successMessage: 'Задача успешно обновлена' })),
          catchError((err) => of(TasksActions.updateTaskFailure({ error: 'Ошибка обновления задачи' })))
        );
      })
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksApiActions.deleteTask),
      mergeMap((action) => {
        return this.tasksService.deleteTask(action.task).pipe(
          map(() => TasksActions.deleteTasksSuccess({ task: action.task, deleteMessage: 'Задача успешно удалена' })),
          catchError(() => of(TasksActions.deleteTasksFailure({ error: 'Ошибка удаления задачи' })))
        );
      })
    );
  });

  deleteMultipleTasks = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksApiActions.deleteMultipleTasks),
      mergeMap((action) => {
        return this.tasksService.deleteMultipleTasks(action.tasks.map((task) => task._id)).pipe(
          map(() => {
            const tasks = action.tasks;
            return TasksActions.deleteMultipleTasksSuccess({ tasks, deleteMessage: 'Выполненные задачи удалены' });
          }),
          catchError(() => of(TasksActions.deleteMultipleTasksFailure({ error: 'Ошибка удаления задач' })))
        );
      })
    );
  });

  doneTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksApiActions.doneTask),
      map((action) => {
        return {
          ...action.task,
          done: !action.task.done,
        };
      }),
      mergeMap((task) => {
        return this.tasksService.updateTask(task).pipe(
          map((task) => TasksActions.doneTaskSuccess({ task })),
          catchError(() => of(TasksActions.createTaskFailure({ error: 'Ошибка обновления задачи' })))
        );
      })
    );
  });
}
