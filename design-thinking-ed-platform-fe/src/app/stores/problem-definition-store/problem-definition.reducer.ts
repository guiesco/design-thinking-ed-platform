import { createReducer, on } from '@ngrx/store';
import {
  ProblemDefinitionState,
  initialState,
} from './problem-definition.state';
import * as ProblemDefinitionActions from './problem-definition.actions';

export const problemDefinitionReducer = createReducer(
  initialState,

  // Load Responses
  on(ProblemDefinitionActions.loadProblemDefinitionResponses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(
    ProblemDefinitionActions.loadProblemDefinitionResponsesSuccess,
    (state, { responses }) => ({
      ...state,
      responses,
      loading: false,
      error: null,
    })
  ),

  on(
    ProblemDefinitionActions.loadProblemDefinitionResponsesFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  ),

  // Create Response
  on(ProblemDefinitionActions.createProblemDefinitionResponse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(
    ProblemDefinitionActions.createProblemDefinitionResponseSuccess,
    (state, { response }) => ({
      ...state,
      responses: [...state.responses, response],
      loading: false,
      error: null,
    })
  ),

  on(
    ProblemDefinitionActions.createProblemDefinitionResponseFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  ),

  // Update Response
  on(ProblemDefinitionActions.updateProblemDefinitionResponse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(
    ProblemDefinitionActions.updateProblemDefinitionResponseSuccess,
    (state, { response }) => ({
      ...state,
      responses: state.responses.map((r) =>
        r.id === response.id ? response : r
      ),
      loading: false,
      error: null,
    })
  ),

  on(
    ProblemDefinitionActions.updateProblemDefinitionResponseFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  ),

  // Delete Response
  on(ProblemDefinitionActions.deleteProblemDefinitionResponse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(
    ProblemDefinitionActions.deleteProblemDefinitionResponseSuccess,
    (state, { responseId }) => ({
      ...state,
      responses: state.responses.filter((r) => r.id !== responseId),
      loading: false,
      error: null,
    })
  ),

  on(
    ProblemDefinitionActions.deleteProblemDefinitionResponseFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  ),

  // Upvote Response
  on(ProblemDefinitionActions.upvoteProblemDefinitionResponse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(
    ProblemDefinitionActions.upvoteProblemDefinitionResponseSuccess,
    (state, { response }) => ({
      ...state,
      responses: state.responses.map((r) =>
        r.id === response.id ? response : r
      ),
      loading: false,
      error: null,
    })
  ),

  on(
    ProblemDefinitionActions.upvoteProblemDefinitionResponseFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  )
);
