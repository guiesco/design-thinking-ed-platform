import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { EmpathyMapService } from './empathy-map.service';
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

  // Novos effects para respostas
  createResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmpathyMapActions.createResponse),
      mergeMap(({ response }) =>
        this.empathyMapService.createResponse(response).pipe(
          map((createdResponse) =>
            EmpathyMapActions.createResponseSuccess({
              response: createdResponse,
            })
          ),
          catchError((error) =>
            of(EmpathyMapActions.createResponseFailure({ error }))
          )
        )
      )
    )
  );

  loadResponses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmpathyMapActions.loadResponses),
      mergeMap(({ projectId }) =>
        this.empathyMapService.findAllResponsesByProject(projectId).pipe(
          map((responses) =>
            EmpathyMapActions.loadResponsesSuccess({ responses })
          ),
          catchError((error) =>
            of(EmpathyMapActions.loadResponsesFailure({ error }))
          )
        )
      )
    )
  );

  deleteResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmpathyMapActions.deleteResponse),
      mergeMap(({ id, userId }) =>
        this.empathyMapService.deleteResponse(id, userId).pipe(
          map(() => EmpathyMapActions.deleteResponseSuccess({ id })),
          catchError((error) =>
            of(EmpathyMapActions.deleteResponseFailure({ error }))
          )
        )
      )
    )
  );

  upvoteResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmpathyMapActions.upvoteResponse),
      mergeMap(({ responseId }) =>
        this.empathyMapService.upvoteResponse(responseId).pipe(
          map((updatedResponse) =>
            EmpathyMapActions.upvoteResponseSuccess({
              response: updatedResponse,
            })
          ),
          catchError((error) =>
            of(EmpathyMapActions.upvoteResponseFailure({ error }))
          )
        )
      )
    )
  );

  downvoteResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmpathyMapActions.downvoteResponse),
      mergeMap(({ responseId }) =>
        this.empathyMapService.downvoteResponse(responseId).pipe(
          map((updatedResponse) =>
            EmpathyMapActions.downvoteResponseSuccess({
              response: updatedResponse,
            })
          ),
          catchError((error) =>
            of(EmpathyMapActions.downvoteResponseFailure({ error }))
          )
        )
      )
    )
  );

  toggleResponseSelection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmpathyMapActions.toggleResponseSelection),
      mergeMap(({ responseId }) =>
        this.empathyMapService.toggleResponseSelection(responseId).pipe(
          map((updatedResponse) =>
            EmpathyMapActions.toggleResponseSelectionSuccess({
              response: updatedResponse,
            })
          ),
          catchError((error) =>
            of(EmpathyMapActions.toggleResponseSelectionFailure({ error }))
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
