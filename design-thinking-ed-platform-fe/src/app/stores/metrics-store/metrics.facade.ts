import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as MetricsActions from './metrics.actions';
import { ProjectMetricsResponse } from './metrics.interface';
import * as MetricsSelectors from './metrics.selectors';

@Injectable({
  providedIn: 'root',
})
export class MetricsFacade {
  metrics$: Observable<ProjectMetricsResponse | null> = this.store.select(
    MetricsSelectors.selectMetrics
  );

  isLoading$: Observable<boolean> = this.store.select(
    MetricsSelectors.selectIsLoading
  );

  error$: Observable<string | null> = this.store.select(
    MetricsSelectors.selectError
  );

  constructor(private store: Store) {}

  loadMetrics(projectId: number, userId: number): void {
    this.store.dispatch(MetricsActions.loadMetrics({ projectId, userId }));
  }
}
