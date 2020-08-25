import { Injectable } from '@angular/core';

import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { StatisticsService } from './../../services/statistics.service';
import { loadStatisticsAction, loadStatisticsSuccessAction, loadStatisticsFailureAction } from './../actions';

@Injectable()
export class StatisticsEffects {
  constructor(private actions$: Actions, private statisticsService: StatisticsService) {}

  loadStatistics$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadStatisticsAction),
      mergeMap(() => {
        return this.statisticsService.getStatistics().pipe(
          map((statistics) => loadStatisticsSuccessAction({ statistics })),
          catchError((err) => of(loadStatisticsFailureAction({ error: 'Ошибка загрузки статистики' })))
        );
      })
    );
  });
}
