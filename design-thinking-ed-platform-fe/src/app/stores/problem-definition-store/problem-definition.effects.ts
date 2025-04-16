import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ProblemDefinitionService } from './problem-definition.service';
import * as ProblemDefinitionActions from './problem-definition.actions';

@Injectable()
export class ProblemDefinitionEffects {
  loadResponses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProblemDefinitionActions.loadProblemDefinitionResponses),
      switchMap(({ projectId }) =>
        this.problemDefinitionService.getResponses(projectId).pipe(
          map((responses) =>
            ProblemDefinitionActions.loadProblemDefinitionResponsesSuccess({
              responses,
            })
          ),
          catchError((error) =>
            of(
              ProblemDefinitionActions.loadProblemDefinitionResponsesFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  createResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProblemDefinitionActions.createProblemDefinitionResponse),
      switchMap(({ response }) =>
        this.problemDefinitionService.createResponse(response).pipe(
          map((createdResponse) =>
            ProblemDefinitionActions.createProblemDefinitionResponseSuccess({
              response: createdResponse,
            })
          ),
          catchError((error) =>
            of(
              ProblemDefinitionActions.createProblemDefinitionResponseFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  updateResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProblemDefinitionActions.updateProblemDefinitionResponse),
      switchMap(({ response }) =>
        this.problemDefinitionService.updateResponse(response).pipe(
          map((updatedResponse) =>
            ProblemDefinitionActions.updateProblemDefinitionResponseSuccess({
              response: updatedResponse,
            })
          ),
          catchError((error) =>
            of(
              ProblemDefinitionActions.updateProblemDefinitionResponseFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  deleteResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProblemDefinitionActions.deleteProblemDefinitionResponse),
      switchMap(({ responseId }) =>
        this.problemDefinitionService.deleteResponse(responseId).pipe(
          map(() =>
            ProblemDefinitionActions.deleteProblemDefinitionResponseSuccess({
              responseId,
            })
          ),
          catchError((error) =>
            of(
              ProblemDefinitionActions.deleteProblemDefinitionResponseFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  upvoteResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProblemDefinitionActions.upvoteProblemDefinitionResponse),
      switchMap(({ responseId }) =>
        this.problemDefinitionService.upvoteResponse(responseId).pipe(
          map((updatedResponse) =>
            ProblemDefinitionActions.upvoteProblemDefinitionResponseSuccess({
              response: updatedResponse,
            })
          ),
          catchError((error) =>
            of(
              ProblemDefinitionActions.upvoteProblemDefinitionResponseFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private problemDefinitionService: ProblemDefinitionService
  ) {}
}
