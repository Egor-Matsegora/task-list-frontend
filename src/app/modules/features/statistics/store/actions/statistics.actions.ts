import { Statistics } from '@app/interfaces/statistics.interface';
import { StatisticsActionTypes } from './statistics-action-types.enum';
import { createAction, props } from '@ngrx/store';

export const getStatistics = createAction(StatisticsActionTypes.GET_STATISTICS);

export const getStatisticsSuccess = createAction(
  StatisticsActionTypes.GET_STATISTICS_SUCCESS,
  props<{ statistics: Statistics }>()
);

export const getStatisticsFailure = createAction(
  StatisticsActionTypes.GET_STATISTICS_FAILURE,
  props<{ error: string }>()
);
