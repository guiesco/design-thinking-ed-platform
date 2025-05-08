import { createReducer, on } from '@ngrx/store';
import { MetricsState } from './metrics.interface';
import * as MetricsActions from './metrics.actions';

export const initialState: MetricsState = {
  isLoading: false,
  error: null,
  metrics: null,
};

export const metricsReducer = createReducer(
  initialState,

  on(MetricsActions.loadMetrics, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(MetricsActions.loadMetricsSuccess, (state, { metrics }) => ({
    ...state,
    isLoading: false,
    metrics,
  })),

  on(MetricsActions.loadMetricsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);
