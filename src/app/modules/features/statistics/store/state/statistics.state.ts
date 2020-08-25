import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RootState } from '@core/store/state/root-state.interface';
import { StatisticsState } from './';

export interface State extends RootState {
  statistics: StatisticsState;
}

const getStatisticsFeatureState = createFeatureSelector<StatisticsState>('statistics');

export const getStatistics = createSelector(getStatisticsFeatureState, (state) => state.statistics);

export const getStatisticsLoading = createSelector(getStatisticsFeatureState, (state) => state.loading);

export const getStatisticsError = createSelector(getStatisticsFeatureState, (state) => state.error);
