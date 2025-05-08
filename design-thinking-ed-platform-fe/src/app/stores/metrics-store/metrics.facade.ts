import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as MetricsActions from './metrics.actions';
import * as MetricsSelectors from './metrics.selectors';
import {
  DesignThinkingStage,
  ProjectMetricsResponse,
} from './metrics.interface';
import { MetricsState } from './metrics.reducer';

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

  currentStage$: Observable<DesignThinkingStage> = this.store.select(
    MetricsSelectors.selectCurrentStage
  );

  constructor(private store: Store<MetricsState>) {}

  loadMetrics(
    projectId: number,
    userId: number,
    stage?: DesignThinkingStage
  ): void {
    this.store.dispatch(
      MetricsActions.loadMetrics({ projectId, userId, stage })
    );
  }

  setCurrentStage(stage: DesignThinkingStage): void {
    this.store.dispatch(MetricsActions.setCurrentStage({ stage }));
  }
}
