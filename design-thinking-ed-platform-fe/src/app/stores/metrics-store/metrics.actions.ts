import { createAction, props } from '@ngrx/store';
import {
  DesignThinkingStage,
  ProjectMetricsResponse,
} from './metrics.interface';

export const loadMetrics = createAction(
  '[Metrics] Load Metrics',
  props<{ projectId: number; userId: number; stage?: DesignThinkingStage }>()
);

export const loadMetricsSuccess = createAction(
  '[Metrics] Load Metrics Success',
  props<{ metrics: ProjectMetricsResponse }>()
);

export const loadMetricsFailure = createAction(
  '[Metrics] Load Metrics Failure',
  props<{ error: string }>()
);

export const setCurrentStage = createAction(
  '[Metrics] Set Current Stage',
  props<{ stage: DesignThinkingStage }>()
);
