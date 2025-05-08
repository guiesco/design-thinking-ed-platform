import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MetricsState } from './metrics.interface';

export const selectMetricsState =
  createFeatureSelector<MetricsState>('metrics');

export const selectMetrics = createSelector(
  selectMetricsState,
  (state: MetricsState) => state.metrics
);

export const selectIsLoading = createSelector(
  selectMetricsState,
  (state: MetricsState) => state.isLoading
);

export const selectError = createSelector(
  selectMetricsState,
  (state: MetricsState) => state.error
);
