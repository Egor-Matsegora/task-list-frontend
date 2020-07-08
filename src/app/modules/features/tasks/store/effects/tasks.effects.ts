import { Injectable } from '@angular/core';

import { mergeMap, map, catchError } from 'rxjs/operators';
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
        return this.tasksService.createTask(action.task).pipe(
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

  daleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksApiActions.deleteTask),
      mergeMap((action) => {
        return this.tasksService.deleteTask(action.task).pipe(
          map(() => TasksActions.deleteTasksSuccess({ task: action.task, deleteMessage: 'Заметка успешно удалена' })),
          catchError(() => of(TasksActions.deleteTasksFailure({ error: 'Ошибка удаления задачи' })))
        );
      })
    );
  });

  doneTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TasksApiActions.doneTask),
      mergeMap((action) => {
        return this.tasksService.updateTask(action.task).pipe(
          map((task) => TasksActions.doneTaskSuccess({ task })),
          catchError(() => of(TasksActions.createTaskFailure({ error: 'Ошибка обновления задачи' })))
        );
      })
    );
  });
}
