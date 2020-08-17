import {
  loadStatisticsAction,
  loadStatisticsSuccessAction,
  loadStatisticsFailureAction,
  clearStatisticsErrorsAction,
} from './../actions/statistics.actions';
import { createReducer, on, Action } from '@ngrx/store';
import { StatisticsState } from './../state/statistics.state';

export const InitialStatisticsState: StatisticsState = {
  loading: false,
  error: null,
  statistics: null,
};

const reducers = createReducer(
  InitialStatisticsState,
  on(
    loadStatisticsAction,
    (state): StatisticsState => {
      return {
        ...state,
        loading: true,
      };
    }
  ),
  on(
    loadStatisticsSuccessAction,
    (state, { statistics }): StatisticsState => {
      return {
        ...state,
        loading: false,
        error: null,
        statistics,
      };
    }
  ),
  on(
    loadStatisticsFailureAction,
    (state, { error }): StatisticsState => {
      return {
        ...state,
        error,
        loading: false,
      };
    }
  ),
  on(
    clearStatisticsErrorsAction,
    (state): StatisticsState => {
      return {
        ...state,
        error: null,
      };
    }
  )
);

export function statisticsReducer(state: StatisticsState | undefined, action: Action) {
  return reducers(state, action);
}
