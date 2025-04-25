import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as IdeationActions from './ideation.actions';
import { IdeationService } from './ideation.service';

@Injectable()
export class IdeationEffects {
  constructor(
    private actions$: Actions,
    private ideationService: IdeationService
  ) {}

  // Ideas Effects
  loadIdeas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IdeationActions.loadIdeasByProject),
      mergeMap(({ projectId }) =>
        this.ideationService.getIdeasByProject(projectId).pipe(
          map((ideas) => IdeationActions.loadIdeasSuccess({ ideas })),
          catchError((error) => of(IdeationActions.loadIdeasFailure({ error })))
        )
      )
    )
  );

  createIdea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IdeationActions.createIdea),
      mergeMap(({ idea }) =>
        this.ideationService.createIdea(idea).pipe(
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
      mergeMap(({ ideaId, update }) =>
        this.ideationService.updateIdea(ideaId, update).pipe(
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
      mergeMap(({ ideaId }) =>
        this.ideationService.deleteIdea(ideaId).pipe(
          map(() => IdeationActions.deleteIdeaSuccess({ ideaId })),
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
      mergeMap(({ ideaId, userId }) =>
        this.ideationService.upvoteIdea(ideaId, userId).pipe(
          map((idea) => IdeationActions.upvoteIdeaSuccess({ idea })),
          catchError((error) =>
            of(IdeationActions.upvoteIdeaFailure({ error }))
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
      mergeMap(({ point }) =>
        this.ideationService.createPoint(point).pipe(
          map((point) => IdeationActions.createPointSuccess({ point })),
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
      mergeMap(({ pointId, update }) =>
        this.ideationService.updatePoint(pointId, update).pipe(
          map((point) => IdeationActions.updatePointSuccess({ point })),
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
      mergeMap(({ pointId }) =>
        this.ideationService.deletePoint(pointId).pipe(
          map(() => IdeationActions.deletePointSuccess({ pointId })),
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
      mergeMap(({ pointId, userId }) =>
        this.ideationService.upvotePoint(pointId, userId).pipe(
          map((point) => IdeationActions.upvotePointSuccess({ point })),
          catchError((error) =>
            of(IdeationActions.upvotePointFailure({ error }))
          )
        )
      )
    )
  );
}
