import { Injectable } from '@angular/core';

import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { TasksService } from '../../services/tasks/tasks.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  updateTaskAction,
  updateTaskSuccessAction,
  updateTaskFailureAction,
  doneTaskAction,
  doneTaskSuccessAction,
  doneTaskFailureAction,
} from '../actions';

@Injectable()
export class UpdateTasksEffects {
  constructor(private actions$: Actions, private tasksService: TasksService) {}

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateTaskAction),
      mergeMap((action) => {
        return this.tasksService.updateTask(action.task).pipe(
          map((task) => updateTaskSuccessAction({ task, successMessage: 'Задача успешно обновлена' })),
          catchError((err) => of(updateTaskFailureAction({ error: 'Ошибка обновления задачи' })))
        );
      })
    );
  });

  doneTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(doneTaskAction),
      map((action) => {
        return {
          ...action.task,
          done: !action.task.done,
        };
      }),
      mergeMap((task) => {
        return this.tasksService.updateTask(task).pipe(
          map((task) => doneTaskSuccessAction({ task })),
          catchError(() => of(doneTaskFailureAction({ error: 'Ошибка обновления задачи' })))
        );
      })
    );
  });
}
