import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ChallengeDefinitionService } from './challenge-definition.service';
import * as ChallengeDefinitionActions from './challenge-definition.actions';
import { ResponseType } from '../../common/interfaces/challenge-definition-response.interface';

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
            of(ChallengeDefinitionActions.loadResponsesFailure({ error }))
          )
        )
      )
    )
  );

  createResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeDefinitionActions.createResponse),
      switchMap(({ responseType, content, userId, projectId }) =>
        this.challengeDefinitionService
          .createResponse(responseType, content, userId, projectId)
          .pipe(
            map((response) =>
              ChallengeDefinitionActions.createResponseSuccess({ response })
            ),
            catchError((error) =>
              of(ChallengeDefinitionActions.createResponseFailure({ error }))
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
            map((response) =>
              ChallengeDefinitionActions.updateResponseSuccess({ response })
            ),
            catchError((error) =>
              of(ChallengeDefinitionActions.updateResponseFailure({ error }))
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
            of(ChallengeDefinitionActions.deleteResponseFailure({ error }))
          )
        )
      )
    )
  );

  upvoteResponse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeDefinitionActions.upvoteResponse),
      switchMap(({ id, userId }) =>
        this.challengeDefinitionService.upvoteResponse(id, userId).pipe(
          map((response) =>
            ChallengeDefinitionActions.upvoteResponseSuccess({ response })
          ),
          catchError((error) =>
            of(ChallengeDefinitionActions.upvoteResponseFailure({ error }))
          )
        )
      )
    )
  );

  removeVote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeDefinitionActions.removeVote),
      switchMap(({ id, userId }) =>
        this.challengeDefinitionService.removeVote(id, userId).pipe(
          map((response) =>
            ChallengeDefinitionActions.removeVoteSuccess({ response })
          ),
          catchError((error) =>
            of(ChallengeDefinitionActions.removeVoteFailure({ error }))
          )
        )
      )
    )
  );

  toggleResponseSelection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChallengeDefinitionActions.toggleResponseSelection),
      switchMap(({ id, userId }) =>
        this.challengeDefinitionService
          .toggleResponseSelection(id, userId)
          .pipe(
            map((response) =>
              ChallengeDefinitionActions.toggleResponseSelectionSuccess({
                response,
              })
            ),
            catchError((error) =>
              of(
                ChallengeDefinitionActions.toggleResponseSelectionFailure({
                  error,
                })
              )
            )
          )
      )
    )
  );
}
