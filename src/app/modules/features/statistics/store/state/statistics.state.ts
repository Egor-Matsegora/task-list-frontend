import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootState } from '@core/store/state/root-state.interface';
import { Statistics } from '@app/interfaces/statistics.interface';

export interface StatisticsState {
  loading: boolean;
  error: string | null;
  statistics: Statistics | null;
}

export interface State extends RootState {
  statistics: StatisticsState;
}

const getStatisticsFeatureState = createFeatureSelector<StatisticsState>('statistics');

export const getStatistics = createSelector(getStatisticsFeatureState, (state) => state.statistics);

export const getStatisticsLoading = createSelector(getStatisticsFeatureState, (state) => state.loading);

export const getStatisticsError = createSelector(getStatisticsFeatureState, (state) => state.error);
