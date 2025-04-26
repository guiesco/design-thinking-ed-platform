import { createReducer, on } from '@ngrx/store';
import { initialIdeationState } from './ideation.state';
import * as IdeationActions from './ideation.actions';

export const ideationReducer = createReducer(
  initialIdeationState,

  // Loading state
  on(
    IdeationActions.loadIdeasByProject,
    IdeationActions.createIdea,
    IdeationActions.updateIdea,
    IdeationActions.deleteIdea,
    IdeationActions.upvoteIdea,
    IdeationActions.loadPointsByIdea,
    IdeationActions.createPoint,
    IdeationActions.updatePoint,
    IdeationActions.deletePoint,
    IdeationActions.upvotePoint,
    (state) => ({
      ...state,
      loading: true,
      error: null,
    })
  ),

  // Error state
  on(
    IdeationActions.loadIdeasFailure,
    IdeationActions.createIdeaFailure,
    IdeationActions.updateIdeaFailure,
    IdeationActions.deleteIdeaFailure,
    IdeationActions.upvoteIdeaFailure,
    IdeationActions.loadPointsFailure,
    IdeationActions.createPointFailure,
    IdeationActions.updatePointFailure,
    IdeationActions.deletePointFailure,
    IdeationActions.upvotePointFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  ),

  // Ideas actions
  on(IdeationActions.loadIdeasSuccess, (state, { ideas }) => ({
    ...state,
    ideas,
    loading: false,
  })),

  on(IdeationActions.createIdeaSuccess, (state, { idea }) => ({
    ...state,
    ideas: [...state.ideas, idea],
    loading: false,
  })),

  on(IdeationActions.updateIdeaSuccess, (state, { idea }) => ({
    ...state,
    ideas: state.ideas.map((i) => (i.id === idea.id ? idea : i)),
    loading: false,
  })),

  on(IdeationActions.deleteIdeaSuccess, (state, { ideaId }) => ({
    ...state,
    ideas: state.ideas.filter((i) => i.id !== ideaId),
    loading: false,
  })),

  on(IdeationActions.upvoteIdeaSuccess, (state, { idea }) => ({
    ...state,
    ideas: state.ideas.map((i) => (i.id === idea.id ? idea : i)),
    loading: false,
  })),

  // Points actions
  on(IdeationActions.loadPointsSuccess, (state, { points }) => ({
    ...state,
    points,
    loading: false,
  })),

  on(IdeationActions.createPointSuccess, (state, { point }) => ({
    ...state,
    ideas: state.ideas.map((i) =>
      i.id === point.ideaId ? { ...i, points: [...i.points, point] } : i
    ),
    loading: false,
  })),

  on(IdeationActions.updatePointSuccess, (state, { point }) => ({
    ...state,
    ideas: state.ideas.map((i) =>
      i.id === point.ideaId
        ? { ...i, points: i.points.map((p) => (p.id === point.id ? point : p)) }
        : i
    ),
    loading: false,
  })),

  on(IdeationActions.deletePointSuccess, (state, { pointId, ideaId }) => ({
    ...state,
    ideas: state.ideas.map((i) =>
      i.id === ideaId
        ? { ...i, points: i.points.filter((p) => p.id !== pointId) }
        : i
    ),
    loading: false,
  })),

  on(IdeationActions.upvotePointSuccess, (state, { point }) => ({
    ...state,
    ideas: state.ideas.map((i) =>
      i.id === point.ideaId
        ? { ...i, points: i.points.map((p) => (p.id === point.id ? point : p)) }
        : i
    ),
    loading: false,
  }))
);
