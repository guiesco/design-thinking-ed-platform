import { createReducer, on } from '@ngrx/store';
import * as IdeationActions from './ideation.actions';
import { IdeationState } from './ideation.state';

export const initialState: IdeationState = {
  ideas: [],
  loading: false,
  error: null,
};

export const ideationReducer = createReducer(
  initialState,

  // Load Ideas
  on(IdeationActions.loadIdeasByProject, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IdeationActions.loadIdeasByProjectSuccess, (state, { ideas }) => ({
    ...state,
    ideas,
    loading: false,
  })),
  on(IdeationActions.loadIdeasByProjectFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Create Idea
  on(IdeationActions.createIdea, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IdeationActions.createIdeaSuccess, (state, { idea }) => ({
    ...state,
    ideas: [...state.ideas, idea],
    loading: false,
  })),
  on(IdeationActions.createIdeaFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Update Idea
  on(IdeationActions.updateIdea, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IdeationActions.updateIdeaSuccess, (state, { idea }) => ({
    ...state,
    ideas: state.ideas.map((i) => (i.id === idea.id ? idea : i)),
    loading: false,
  })),
  on(IdeationActions.updateIdeaFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Delete Idea
  on(IdeationActions.deleteIdea, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IdeationActions.deleteIdeaSuccess, (state, { id }) => ({
    ...state,
    ideas: state.ideas.filter((idea) => idea.id !== id),
    loading: false,
  })),
  on(IdeationActions.deleteIdeaFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Upvote Idea
  on(IdeationActions.upvoteIdea, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IdeationActions.upvoteIdeaSuccess, (state, { idea }) => ({
    ...state,
    ideas: state.ideas.map((i) => (i.id === idea.id ? idea : i)),
    loading: false,
  })),
  on(IdeationActions.upvoteIdeaFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Toggle Idea Selection
  on(IdeationActions.toggleIdeaSelection, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IdeationActions.toggleIdeaSelectionSuccess, (state, { idea }) => ({
    ...state,
    ideas: state.ideas.map((i) => (i.id === idea.id ? idea : i)),
    loading: false,
  })),
  on(IdeationActions.toggleIdeaSelectionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Load Selected Ideas
  on(IdeationActions.loadSelectedIdeas, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IdeationActions.loadSelectedIdeasSuccess, (state, { ideas }) => ({
    ...state,
    ideas,
    loading: false,
  })),
  on(IdeationActions.loadSelectedIdeasFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Create Point
  on(IdeationActions.createPoint, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IdeationActions.createPointSuccess, (state, { point, ideaId }) => ({
    ...state,
    ideas: state.ideas.map((idea) =>
      idea.id === ideaId
        ? { ...idea, points: [...(idea.points || []), point] }
        : idea
    ),
    loading: false,
  })),
  on(IdeationActions.createPointFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Update Point
  on(IdeationActions.updatePoint, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IdeationActions.updatePointSuccess, (state, { point, ideaId }) => ({
    ...state,
    ideas: state.ideas.map((idea) =>
      idea.id === ideaId
        ? {
            ...idea,
            points: (idea.points || []).map((p) =>
              p.id === point.id ? point : p
            ),
          }
        : idea
    ),
    loading: false,
  })),
  on(IdeationActions.updatePointFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Delete Point
  on(IdeationActions.deletePoint, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IdeationActions.deletePointSuccess, (state, { id, ideaId }) => ({
    ...state,
    ideas: state.ideas.map((idea) =>
      idea.id === ideaId
        ? {
            ...idea,
            points: (idea.points || []).filter((point) => point.id !== id),
          }
        : idea
    ),
    loading: false,
  })),
  on(IdeationActions.deletePointFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Upvote Point
  on(IdeationActions.upvotePoint, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(IdeationActions.upvotePointSuccess, (state, { point, ideaId }) => ({
    ...state,
    ideas: state.ideas.map((idea) =>
      idea.id === ideaId
        ? {
            ...idea,
            points: (idea.points || []).map((p) =>
              p.id === point.id ? point : p
            ),
          }
        : idea
    ),
    loading: false,
  })),
  on(IdeationActions.upvotePointFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
