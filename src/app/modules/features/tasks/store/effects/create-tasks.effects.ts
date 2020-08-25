import { Injectable } from '@angular/core';

import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { TasksService } from '../../services/tasks/tasks.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createTaskAction, createTaskSuccessAction, createTaskFailureAction } from '../actions';

@Injectable()
export class CreateTasksEffects {
  constructor(private actions$: Actions, private tasksService: TasksService) {}

  createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createTaskAction),
      mergeMap((action) => {
        return this.tasksService.createTask({ title: action.title, description: action.description }).pipe(
          map((task) => createTaskSuccessAction({ task, successMessage: 'Задача успешно создана' })),
          catchError((err) => of(createTaskFailureAction({ error: 'Ошибка создания задачи' })))
        );
      })
    );
  });
}
