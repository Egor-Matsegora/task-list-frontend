import { Injectable } from '@angular/core';

import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { TasksService } from '../../services/tasks/tasks.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadTasksAction, loadTasksSuccessAction, loadTasksFailureAction } from '../actions';

@Injectable()
export class LoadTasksEffects {
  constructor(private actions$: Actions, private tasksService: TasksService) {}

  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTasksAction),
      mergeMap(() => {
        return this.tasksService.getTasks().pipe(
          map((tasks) => loadTasksSuccessAction({ tasks })),
          catchError((err) => of(loadTasksFailureAction({ error: 'Ошибка загрузки задач' })))
        );
      })
    );
  });
}
