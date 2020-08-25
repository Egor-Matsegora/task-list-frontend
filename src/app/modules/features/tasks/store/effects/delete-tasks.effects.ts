import { Injectable } from '@angular/core';

import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { TasksService } from '../../services/tasks/tasks.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  deleteTaskAction,
  deleteTasksSuccessAction,
  deleteTasksFailureAction,
  deleteMultipleTasksAction,
  deleteMultipleTasksSuccessAction,
  deleteMultipleTasksFailureAction,
} from '../actions';

@Injectable()
export class DeleteTasksEffects {
  constructor(private actions$: Actions, private tasksService: TasksService) {}

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteTaskAction),
      mergeMap((action) => {
        return this.tasksService.deleteTask(action.task).pipe(
          map(() => deleteTasksSuccessAction({ task: action.task, deleteMessage: 'Задача успешно удалена' })),
          catchError(() => of(deleteTasksFailureAction({ error: 'Ошибка удаления задачи' })))
        );
      })
    );
  });

  deleteMultipleTasks = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteMultipleTasksAction),
      mergeMap((action) => {
        return this.tasksService.deleteMultipleTasks(action.tasks.map((task) => task._id)).pipe(
          map(() => {
            const tasks = action.tasks;
            return deleteMultipleTasksSuccessAction({ tasks, deleteMessage: 'Выполненные задачи удалены' });
          }),
          catchError(() => of(deleteMultipleTasksFailureAction({ error: 'Ошибка удаления задач' })))
        );
      })
    );
  });
}
