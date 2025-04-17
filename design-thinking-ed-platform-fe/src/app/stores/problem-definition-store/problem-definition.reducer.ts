import { createReducer, on } from '@ngrx/store';
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
} from './problem-definition.actions';
import { ProblemDefinitionResponse } from '../../common/interfaces/problem-definition-response.interface';

export interface ProblemDefinitionState {
  responses: ProblemDefinitionResponse[];
  loading: boolean;
  error: string | null;
}

export const initialState: ProblemDefinitionState = {
  responses: [],
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
  }))
);
