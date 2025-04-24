import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { ProblemDefinitionService } from './problem-definition.service';
import * as ProblemDefinitionActions from './problem-definition.actions';

@Injectable()
export class ProblemDefinitionEffects {
  loadResponses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProblemDefinitionActions.loadProblemDefinitionResponses),
      switchMap(({ projectId, userId }) =>
        this.problemDefinitionService.getResponses(projectId, userId).pipe(
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

  loadProblemDefinition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProblemDefinitionActions.loadProblemDefinition),
      switchMap(({ projectId }) =>
        this.problemDefinitionService.getProblemDefinition(projectId).pipe(
          map((problemDefinition) =>
            ProblemDefinitionActions.loadProblemDefinitionSuccess({
              problemDefinition,
            })
          ),
          catchError((error) =>
            of(
              ProblemDefinitionActions.loadProblemDefinitionFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  createResponses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProblemDefinitionActions.createProblemDefinitionResponses),
      switchMap(({ responses }) =>
        this.problemDefinitionService.createResponses(responses).pipe(
          map((createdResponses) =>
            ProblemDefinitionActions.createProblemDefinitionResponsesSuccess({
              responses: createdResponses,
            })
          ),
          catchError((error) =>
            of(
              ProblemDefinitionActions.createProblemDefinitionResponsesFailure({
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
      switchMap(({ responseId, userId }) =>
        this.problemDefinitionService.upvoteResponse(responseId, userId).pipe(
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

  toggleResponseSelection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProblemDefinitionActions.toggleProblemDefinitionResponseSelection),
      switchMap(({ responseId, userId }) =>
        this.problemDefinitionService
          .toggleResponseSelection(responseId, userId)
          .pipe(
            map((updatedResponse) =>
              ProblemDefinitionActions.toggleProblemDefinitionResponseSelectionSuccess(
                {
                  response: updatedResponse,
                }
              )
            ),
            catchError((error) =>
              of(
                ProblemDefinitionActions.toggleProblemDefinitionResponseSelectionFailure(
                  {
                    error: error.message,
                  }
                )
              )
            )
          )
      )
    )
  );

  // Effect para criar uma definição de problema
  createProblemDefinition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProblemDefinitionActions.createProblemDefinition),
      switchMap(({ problemDefinition }) =>
        this.problemDefinitionService
          .createProblemDefinition(problemDefinition)
          .pipe(
            map((response) =>
              ProblemDefinitionActions.createProblemDefinitionSuccess({
                problemDefinition: response,
              })
            ),
            catchError((error) =>
              of(
                ProblemDefinitionActions.createProblemDefinitionFailure({
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
