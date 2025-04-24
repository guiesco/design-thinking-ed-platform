import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as ChallengeDefinitionActions from './challenge-definition.actions';
import { ChallengeDefinitionService } from './challenge-definition.service';

@Injectable()
export class ChallengeDefinitionEffects {
  constructor(
    private actions$: Actions,
    private challengeDefinitionService: ChallengeDefinitionService
  ) {}

  loadResponses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeDefinitionActions.loadResponses),
      switchMap(({ projectId, userId }) =>
        this.challengeDefinitionService.getResponses(projectId, userId).pipe(
          map((responses) =>
            ChallengeDefinitionActions.loadResponsesSuccess({ responses })
          ),
          catchError((error) =>
            of(
              ChallengeDefinitionActions.loadResponsesFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  loadFinalChallengeDefinition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeDefinitionActions.loadFinalChallengeDefinition),
      switchMap(({ projectId }) =>
        this.challengeDefinitionService
          .getFinalChallengeDefinition(projectId)
          .pipe(
            map((challengeDefinition) =>
              ChallengeDefinitionActions.loadFinalChallengeDefinitionSuccess({
                challengeDefinition,
              })
            ),
            catchError((error) =>
              of(
                ChallengeDefinitionActions.loadFinalChallengeDefinitionFailure({
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
      ofType(ChallengeDefinitionActions.createResponse),
      switchMap(({ response }) =>
        this.challengeDefinitionService.createResponse(response).pipe(
          map((createdResponse) =>
            ChallengeDefinitionActions.createResponseSuccess({
              response: createdResponse,
            })
          ),
          catchError((error) =>
            of(
              ChallengeDefinitionActions.createResponseFailure({
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
      ofType(ChallengeDefinitionActions.createResponses),
      switchMap(({ responses }) =>
        this.challengeDefinitionService.createResponses(responses).pipe(
          map((createdResponses) =>
            ChallengeDefinitionActions.createResponsesSuccess({
              responses: createdResponses,
            })
          ),
          catchError((error) =>
            of(
              ChallengeDefinitionActions.createResponsesFailure({
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
      ofType(ChallengeDefinitionActions.updateResponse),
      switchMap(({ id, content, userId }) =>
        this.challengeDefinitionService
          .updateResponse(id, content, userId)
          .pipe(
            map((updatedResponse) =>
              ChallengeDefinitionActions.updateResponseSuccess({
                response: updatedResponse,
              })
            ),
            catchError((error) =>
              of(
                ChallengeDefinitionActions.updateResponseFailure({
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
      ofType(ChallengeDefinitionActions.deleteResponse),
      switchMap(({ id, userId }) =>
        this.challengeDefinitionService.deleteResponse(id, userId).pipe(
          map(() => ChallengeDefinitionActions.deleteResponseSuccess({ id })),
          catchError((error) =>
            of(
              ChallengeDefinitionActions.deleteResponseFailure({
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
      ofType(ChallengeDefinitionActions.upvoteResponse),
      switchMap(({ responseId, userId }) =>
        this.challengeDefinitionService.upvoteResponse(responseId, userId).pipe(
          map((updatedResponse) =>
            ChallengeDefinitionActions.upvoteResponseSuccess({
              response: updatedResponse,
            })
          ),
          catchError((error) =>
            of(
              ChallengeDefinitionActions.upvoteResponseFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  removeVote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeDefinitionActions.removeVote),
      switchMap(({ responseId, userId }) =>
        this.challengeDefinitionService.removeVote(responseId, userId).pipe(
          map((updatedResponse) =>
            ChallengeDefinitionActions.removeVoteSuccess({
              response: updatedResponse,
            })
          ),
          catchError((error) =>
            of(
              ChallengeDefinitionActions.removeVoteFailure({
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
      ofType(ChallengeDefinitionActions.toggleResponseSelection),
      switchMap(({ responseId, userId }) =>
        this.challengeDefinitionService
          .toggleResponseSelection(responseId, userId)
          .pipe(
            map((updatedResponse) =>
              ChallengeDefinitionActions.toggleResponseSelectionSuccess({
                response: updatedResponse,
              })
            ),
            catchError((error) =>
              of(
                ChallengeDefinitionActions.toggleResponseSelectionFailure({
                  error: error.message,
                })
              )
            )
          )
      )
    )
  );

  createChallengeDefinition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeDefinitionActions.createChallengeDefinition),
      switchMap(({ challengeDefinition }) =>
        this.challengeDefinitionService
          .createChallengeDefinition(challengeDefinition)
          .pipe(
            map((createdChallengeDefinition) =>
              ChallengeDefinitionActions.createChallengeDefinitionSuccess({
                challengeDefinition: createdChallengeDefinition,
              })
            ),
            catchError((error) =>
              of(
                ChallengeDefinitionActions.createChallengeDefinitionFailure({
                  error: error.message,
                })
              )
            )
          )
      )
    )
  );
}
