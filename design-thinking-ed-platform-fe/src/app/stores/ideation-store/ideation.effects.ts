import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as IdeationActions from './ideation.actions';
import { IdeationService } from './ideation.service';

@Injectable()
export class IdeationEffects {
  constructor(
    private actions$: Actions,
    private ideationService: IdeationService
  ) {}

  // Ideas Effects
  loadIdeasByProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IdeationActions.loadIdeasByProject),
      switchMap(({ projectId, userId }) =>
        this.ideationService.getIdeasByProject(projectId, userId).pipe(
          map((ideas) => IdeationActions.loadIdeasByProjectSuccess({ ideas })),
          catchError((error) =>
            of(IdeationActions.loadIdeasByProjectFailure({ error }))
          )
        )
      )
    )
  );

  createIdea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IdeationActions.createIdea),
      switchMap((action) =>
        this.ideationService
          .createIdea({
            title: action.title,
            projectId: action.projectId,
            userId: action.userId,
          })
          .pipe(
            map((idea) => IdeationActions.createIdeaSuccess({ idea })),
            catchError((error) =>
              of(IdeationActions.createIdeaFailure({ error }))
            )
          )
      )
    )
  );

  updateIdea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IdeationActions.updateIdea),
      switchMap(({ id, userId, update }) =>
        this.ideationService.updateIdea(id, userId, update).pipe(
          map((idea) => IdeationActions.updateIdeaSuccess({ idea })),
          catchError((error) =>
            of(IdeationActions.updateIdeaFailure({ error }))
          )
        )
      )
    )
  );

  deleteIdea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IdeationActions.deleteIdea),
      switchMap(({ id, userId }) =>
        this.ideationService.deleteIdea(id, userId).pipe(
          map(() => IdeationActions.deleteIdeaSuccess({ id })),
          catchError((error) =>
            of(IdeationActions.deleteIdeaFailure({ error }))
          )
        )
      )
    )
  );

  upvoteIdea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IdeationActions.upvoteIdea),
      switchMap(({ id, userId }) =>
        this.ideationService.upvoteIdea(id, userId).pipe(
          map((idea) => IdeationActions.upvoteIdeaSuccess({ idea })),
          catchError((error) =>
            of(IdeationActions.upvoteIdeaFailure({ error }))
          )
        )
      )
    )
  );

  toggleIdeaSelection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IdeationActions.toggleIdeaSelection),
      switchMap(({ id, userId }) =>
        this.ideationService.toggleIdeaSelection(id, userId).pipe(
          map((idea) => IdeationActions.toggleIdeaSelectionSuccess({ idea })),
          catchError((error) =>
            of(IdeationActions.toggleIdeaSelectionFailure({ error }))
          )
        )
      )
    )
  );

  loadSelectedIdeas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IdeationActions.loadSelectedIdeas),
      switchMap(({ projectId }) =>
        this.ideationService.getSelectedIdeasByProject(projectId).pipe(
          map((ideas) => IdeationActions.loadSelectedIdeasSuccess({ ideas })),
          catchError((error) =>
            of(IdeationActions.loadSelectedIdeasFailure({ error }))
          )
        )
      )
    )
  );

  // Points Effects
  loadPoints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IdeationActions.loadPointsByIdea),
      mergeMap(({ ideaId }) =>
        this.ideationService.getPointsByIdea(ideaId).pipe(
          map((points) => IdeationActions.loadPointsSuccess({ points })),
          catchError((error) =>
            of(IdeationActions.loadPointsFailure({ error }))
          )
        )
      )
    )
  );

  createPoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IdeationActions.createPoint),
      switchMap((action) =>
        this.ideationService
          .createPoint({
            content: action.content,
            type: action.pointType,
            ideaId: action.ideaId,
            userId: action.userId,
          })
          .pipe(
            map((point) =>
              IdeationActions.createPointSuccess({
                point,
                ideaId: action.ideaId,
              })
            ),
            catchError((error) =>
              of(IdeationActions.createPointFailure({ error }))
            )
          )
      )
    )
  );

  updatePoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IdeationActions.updatePoint),
      switchMap(({ id, userId, update }) =>
        this.ideationService.updatePoint(id, userId, update).pipe(
          map((point) =>
            IdeationActions.updatePointSuccess({
              point,
              ideaId: point.ideaId,
            })
          ),
          catchError((error) =>
            of(IdeationActions.updatePointFailure({ error }))
          )
        )
      )
    )
  );

  deletePoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IdeationActions.deletePoint),
      switchMap(({ id, userId, ideaId }) =>
        this.ideationService.deletePoint(id, userId).pipe(
          map(() => IdeationActions.deletePointSuccess({ id, ideaId })),
          catchError((error) =>
            of(IdeationActions.deletePointFailure({ error }))
          )
        )
      )
    )
  );

  upvotePoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IdeationActions.upvotePoint),
      switchMap(({ id, userId, ideaId }) =>
        this.ideationService.upvotePoint(id, userId).pipe(
          map((point) => IdeationActions.upvotePointSuccess({ point, ideaId })),
          catchError((error) =>
            of(IdeationActions.upvotePointFailure({ error }))
          )
        )
      )
    )
  );
}
