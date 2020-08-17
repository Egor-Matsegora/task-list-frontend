import { Statistics } from '@app/interfaces/statistics.interface';
import { StatisticsActionTypes } from './statistics-action-types.enum';
import { createAction, props } from '@ngrx/store';

export const loadStatisticsAction = createAction(StatisticsActionTypes.GET_STATISTICS);

export const loadStatisticsSuccessAction = createAction(
  StatisticsActionTypes.GET_STATISTICS_SUCCESS,
  props<{ statistics: Statistics }>()
);

export const loadStatisticsFailureAction = createAction(
  StatisticsActionTypes.GET_STATISTICS_FAILURE,
  props<{ error: string }>()
);
export const clearStatisticsErrorsAction = createAction(StatisticsActionTypes.CLEAR_STATISTICS_ERROR);
