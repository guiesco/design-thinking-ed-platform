import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
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
      mergeMap(({ entryId, userId }) =>
        this.empathyMapService.upvoteEmpathyMap(entryId, userId).pipe(
          map((entry) => EmpathyMapActions.upvoteEmpathyMapSuccess({ entry })),
          catchError((error) =>
            of(
              EmpathyMapActions.upvoteEmpathyMapFailure({
                error: error.message,
              })
            )
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
      switchMap(({ response }) =>
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
      switchMap(({ projectId, userId }) =>
        this.empathyMapService.getResponses(projectId, userId).pipe(
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

  updateResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmpathyMapActions.updateResponse),
      mergeMap(({ id, userId, content }) =>
        this.empathyMapService.updateResponse(id, userId, content).pipe(
          map((response) =>
            EmpathyMapActions.updateResponseSuccess({ response })
          ),
          catchError((error) =>
            of(EmpathyMapActions.updateResponseFailure({ error }))
          )
        )
      )
    )
  );

  upvoteResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmpathyMapActions.upvoteResponse),
      switchMap(({ responseId, userId }) =>
        this.empathyMapService.upvoteResponse(responseId, userId).pipe(
          map((response) =>
            EmpathyMapActions.upvoteResponseSuccess({ response })
          ),
          catchError((error) =>
            of(EmpathyMapActions.upvoteResponseFailure({ error }))
          )
        )
      )
    )
  );

  removeUpvoteResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmpathyMapActions.removeUpvoteResponse),
      switchMap(({ responseId, userId }) =>
        this.empathyMapService.removeUpvoteResponse(responseId, userId).pipe(
          map((response) =>
            EmpathyMapActions.removeUpvoteResponseSuccess({ response })
          ),
          catchError((error) =>
            of(EmpathyMapActions.removeUpvoteResponseFailure({ error }))
          )
        )
      )
    )
  );

  toggleResponseSelection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmpathyMapActions.toggleResponseSelection),
      switchMap(({ responseId }) =>
        this.empathyMapService.toggleResponseSelection(responseId).pipe(
          map((response) =>
            EmpathyMapActions.toggleResponseSelectionSuccess({ response })
          ),
          catchError((error) =>
            of(EmpathyMapActions.toggleResponseSelectionFailure({ error }))
          )
        )
      )
    )
  );

  loadFinalEmpathyMap$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmpathyMapActions.loadFinalEmpathyMap),
      switchMap(({ projectId }) =>
        this.empathyMapService.getFinalEmpathyMap(projectId).pipe(
          map((empathyMap) =>
            EmpathyMapActions.loadFinalEmpathyMapSuccess({ empathyMap })
          ),
          catchError((error) =>
            of(EmpathyMapActions.loadFinalEmpathyMapFailure({ error }))
          )
        )
      )
    )
  );

  createResponses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmpathyMapActions.createResponses),
      switchMap(({ responses }) =>
        this.empathyMapService.createResponses(responses).pipe(
          map((createdResponses) =>
            EmpathyMapActions.createResponsesSuccess({
              responses: createdResponses,
            })
          ),
          catchError((error) =>
            of(EmpathyMapActions.createResponsesFailure({ error }))
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
