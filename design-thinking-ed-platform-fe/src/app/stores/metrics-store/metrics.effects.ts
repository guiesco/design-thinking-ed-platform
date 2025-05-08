import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as MetricsActions from './metrics.actions';
import { MetricsService } from './metrics.service';

@Injectable()
export class MetricsEffects {
  constructor(
    private actions$: Actions,
    private metricsService: MetricsService
  ) {}

  loadMetrics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MetricsActions.loadMetrics),
      switchMap(({ projectId, userId, stage }) =>
        this.metricsService.getProjectMetrics(projectId, userId, stage).pipe(
          map((metrics) => MetricsActions.loadMetricsSuccess({ metrics })),
          catchError((error) =>
            of(
              MetricsActions.loadMetricsFailure({
                error: error.message || 'Erro ao carregar métricas',
              })
            )
          )
        )
      )
    )
  );
}
