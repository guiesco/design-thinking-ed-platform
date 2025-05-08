import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MetricsState } from './metrics.reducer';

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

export const selectCurrentStage = createSelector(
  selectMetricsState,
  (state: MetricsState) => state.currentStage
);
