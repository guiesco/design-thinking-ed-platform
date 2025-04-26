import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IdeationState } from './ideation.state';
import { IdeationPointType } from '../../common/interfaces/ideation.interface';

export const selectIdeationState =
  createFeatureSelector<IdeationState>('ideation');

// Ideas selectors
export const selectIdeationIdeas = createSelector(
  selectIdeationState,
  (state) => state.ideas
);

export const selectIdeaById = (ideaId: number) =>
  createSelector(selectIdeationIdeas, (ideas) =>
    ideas.find((idea) => idea.id === ideaId)
  );

// Points selectors
export const selectAllPoints = createSelector(selectIdeationState, (state) =>
  state.ideas.flatMap((idea) => idea.points)
);

export const selectPointsByIdeaId = (ideaId: number) =>
  createSelector(selectAllPoints, (points) =>
    points.filter((point) => point.ideaId === ideaId)
  );

export const selectProsByIdeaId = (ideaId: number) =>
  createSelector(selectPointsByIdeaId(ideaId), (points) =>
    points.filter((point) => point.type === IdeationPointType.PRO)
  );

export const selectConsByIdeaId = (ideaId: number) =>
  createSelector(selectPointsByIdeaId(ideaId), (points) =>
    points.filter((point) => point.type === IdeationPointType.CON)
  );

// Status selectors
export const selectIdeationLoading = createSelector(
  selectIdeationState,
  (state) => state.loading
);

export const selectIdeationError = createSelector(
  selectIdeationState,
  (state) => state.error
);
