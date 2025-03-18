import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EmpathyMapService } from 'src/app/stores/empathy-map-store/empathy-map.service';
import * as EmpathyMapActions from './empathy-map.actions';

@Injectable()
export class EmpathyMapEffects {
  loadEmpathyMaps$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmpathyMapActions.loadEmpathyMaps),
      mergeMap(({ projectId }) =>
        this.empathyMapService.getEmpathyMaps(projectId).pipe(
          map((entries) =>
            EmpathyMapActions.loadEmpathyMapsSuccess({ entries })
          ),
          catchError((error) =>
            of(EmpathyMapActions.loadEmpathyMapsFailure({ error }))
          )
        )
      )
    )
  );

  createEmpathyMap$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmpathyMapActions.createEmpathyMap),
      mergeMap(({ entry }) =>
        this.empathyMapService.createEmpathyMap(entry).pipe(
          map((createdEntry) =>
            EmpathyMapActions.createEmpathyMapSuccess({ entry: createdEntry })
          ),
          catchError((error) =>
            of(EmpathyMapActions.createEmpathyMapFailure({ error }))
          )
        )
      )
    )
  );

  updateEmpathyMap$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmpathyMapActions.updateEmpathyMap),
      mergeMap(({ entry }) =>
        this.empathyMapService.updateEmpathyMap(entry).pipe(
          map((updatedEntry) =>
            EmpathyMapActions.updateEmpathyMapSuccess({ entry: updatedEntry })
          ),
          catchError((error) =>
            of(EmpathyMapActions.updateEmpathyMapFailure({ error }))
          )
        )
      )
    )
  );

  deleteEmpathyMap$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmpathyMapActions.deleteEmpathyMap),
      mergeMap(({ entryId }) =>
        this.empathyMapService.deleteEmpathyMap(entryId).pipe(
          map(() => EmpathyMapActions.deleteEmpathyMapSuccess({ entryId })),
          catchError((error) =>
            of(EmpathyMapActions.deleteEmpathyMapFailure({ error }))
          )
        )
      )
    )
  );

  upvoteEmpathyMap$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmpathyMapActions.upvoteEmpathyMap),
      mergeMap(({ entryId }) =>
        this.empathyMapService.upvoteEmpathyMap(entryId).pipe(
          map((updatedEntry) =>
            EmpathyMapActions.upvoteEmpathyMapSuccess({ entry: updatedEntry })
          ),
          catchError((error) =>
            of(EmpathyMapActions.upvoteEmpathyMapFailure({ error }))
          )
        )
      )
    )
  );

  downvoteEmpathyMap$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmpathyMapActions.downvoteEmpathyMap),
      mergeMap(({ entryId }) =>
        this.empathyMapService.downvoteEmpathyMap(entryId).pipe(
          map((updatedEntry) =>
            EmpathyMapActions.downvoteEmpathyMapSuccess({ entry: updatedEntry })
          ),
          catchError((error) =>
            of(EmpathyMapActions.downvoteEmpathyMapFailure({ error }))
          )
        )
      )
    )
  );

  toggleEmpathyMapSelection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmpathyMapActions.toggleEmpathyMapSelection),
      mergeMap(({ entryId }) =>
        this.empathyMapService.toggleEmpathyMapSelection(entryId).pipe(
          map((updatedEntry) =>
            EmpathyMapActions.toggleEmpathyMapSelectionSuccess({
              entry: updatedEntry,
            })
          ),
          catchError((error) =>
            of(EmpathyMapActions.toggleEmpathyMapSelectionFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private empathyMapService: EmpathyMapService
  ) {}
}
