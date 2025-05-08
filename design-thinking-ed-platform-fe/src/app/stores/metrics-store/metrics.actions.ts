import { createAction, props } from '@ngrx/store';
import { ProjectMetricsResponse } from './metrics.interface';

export const loadMetrics = createAction(
  '[Metrics] Load Metrics',
  props<{ projectId: number; userId: number }>()
);

export const loadMetricsSuccess = createAction(
  '[Metrics] Load Metrics Success',
  props<{ metrics: ProjectMetricsResponse }>()
);

export const loadMetricsFailure = createAction(
  '[Metrics] Load Metrics Failure',
  props<{ error: string }>()
);
