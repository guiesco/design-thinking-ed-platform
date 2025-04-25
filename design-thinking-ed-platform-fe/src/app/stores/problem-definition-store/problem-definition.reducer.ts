import { createReducer, on } from '@ngrx/store';
import { ProblemDefinitionState } from './problem-definition.state';
import {
  loadProblemDefinitionResponses,
  loadProblemDefinitionResponsesSuccess,
  loadProblemDefinitionResponsesFailure,
  createProblemDefinitionResponses,
  createProblemDefinitionResponsesSuccess,
  createProblemDefinitionResponsesFailure,
  updateProblemDefinitionResponse,
  updateProblemDefinitionResponseSuccess,
  updateProblemDefinitionResponseFailure,
  deleteProblemDefinitionResponse,
  deleteProblemDefinitionResponseSuccess,
  deleteProblemDefinitionResponseFailure,
  upvoteProblemDefinitionResponse,
  upvoteProblemDefinitionResponseSuccess,
  upvoteProblemDefinitionResponseFailure,
  toggleProblemDefinitionResponseSelection,
  toggleProblemDefinitionResponseSelectionSuccess,
  toggleProblemDefinitionResponseSelectionFailure,
  createProblemDefinition,
  createProblemDefinitionSuccess,
  createProblemDefinitionFailure,
  loadProblemDefinition,
  loadProblemDefinitionSuccess,
  loadProblemDefinitionFailure,
  removeUpvoteProblemDefinitionResponse,
  removeUpvoteProblemDefinitionResponseSuccess,
  removeUpvoteProblemDefinitionResponseFailure,
} from './problem-definition.actions';
import { ProblemDefinitionResponse } from '../../common/interfaces/problem-definition-response.interface';
import { toggleResponseSelection } from '../empathy-map-store/empathy-map.actions';

export const initialState: ProblemDefinitionState = {
  responses: [],
  problemDefinition: null,
  loading: false,
  error: null,
};

export const problemDefinitionReducer = createReducer(
  initialState,
  on(loadProblemDefinitionResponses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadProblemDefinitionResponsesSuccess, (state, { responses }) => ({
    ...state,
    responses,
    loading: false,
  })),
  on(loadProblemDefinitionResponsesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(loadProblemDefinition, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadProblemDefinitionSuccess, (state, { problemDefinition }) => ({
    ...state,
    problemDefinition: problemDefinition[0],
    loading: false,
  })),
  on(loadProblemDefinitionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(createProblemDefinitionResponses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(createProblemDefinitionResponsesSuccess, (state, { responses }) => ({
    ...state,
    responses: [...state.responses, ...responses],
    loading: false,
  })),
  on(createProblemDefinitionResponsesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(updateProblemDefinitionResponse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(updateProblemDefinitionResponseSuccess, (state, { response }) => ({
    ...state,
    responses: state.responses.map((r) =>
      r.id === response.id ? response : r
    ),
    loading: false,
  })),
  on(updateProblemDefinitionResponseFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(deleteProblemDefinitionResponse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(deleteProblemDefinitionResponseSuccess, (state, { responseId }) => ({
    ...state,
    responses: state.responses.filter((r) => r.id !== responseId),
    loading: false,
  })),
  on(deleteProblemDefinitionResponseFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(upvoteProblemDefinitionResponse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(upvoteProblemDefinitionResponseSuccess, (state, { response }) => ({
    ...state,
    responses: state.responses.map((r) =>
      r.id === response.id ? response : r
    ),
    loading: false,
  })),
  on(upvoteProblemDefinitionResponseFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(removeUpvoteProblemDefinitionResponse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(removeUpvoteProblemDefinitionResponseSuccess, (state, { response }) => ({
    ...state,
    responses: state.responses.map((r) =>
      r.id === response.id ? response : r
    ),
    loading: false,
  })),
  on(removeUpvoteProblemDefinitionResponseFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(toggleProblemDefinitionResponseSelection, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    toggleProblemDefinitionResponseSelectionSuccess,
    (state, { response }) => ({
      ...state,
      responses: state.responses.map((r) =>
        r.id === response.id ? response : r
      ),
      loading: false,
    })
  ),
  on(toggleProblemDefinitionResponseSelectionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(createProblemDefinition, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(createProblemDefinitionSuccess, (state, { problemDefinition }) => ({
    ...state,
    problemDefinition,
    loading: false,
  })),
  on(createProblemDefinitionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
