import { createReducer, on } from '@ngrx/store';
import {
  DesignThinkingStage,
  ProjectMetricsResponse,
} from './metrics.interface';
import * as MetricsActions from './metrics.actions';

export interface MetricsState {
  metrics: ProjectMetricsResponse | null;
  isLoading: boolean;
  error: string | null;
  currentStage: DesignThinkingStage;
}

export const initialState: MetricsState = {
  metrics: null,
  isLoading: false,
  error: null,
  currentStage: DesignThinkingStage.ALL,
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
    metrics,
    isLoading: false,
    error: null,
  })),

  on(MetricsActions.loadMetricsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(MetricsActions.setCurrentStage, (state, { stage }) => ({
    ...state,
    currentStage: stage,
  }))
);
