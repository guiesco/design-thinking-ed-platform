import { createReducer, on } from '@ngrx/store';
import { EmpathyMapEntry, EmpathyMapResponse } from './empathy-map.service';
import * as EmpathyMapActions from './empathy-map.actions';

export interface EmpathyMapState {
  entries: EmpathyMapEntry[];
  responses: EmpathyMapResponse[];
  loading: boolean;
  error: any;
}

export const initialState: EmpathyMapState = {
  entries: [],
  responses: [],
  loading: false,
  error: null,
};

export const empathyMapReducer = createReducer(
  initialState,
  on(EmpathyMapActions.loadEmpathyMaps, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmpathyMapActions.loadEmpathyMapsSuccess, (state, { entries }) => ({
    ...state,
    entries,
    loading: false,
  })),
  on(EmpathyMapActions.loadEmpathyMapsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmpathyMapActions.createEmpathyMap, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmpathyMapActions.createEmpathyMapSuccess, (state, { entry }) => ({
    ...state,
    entries: [entry, ...state.entries],
    loading: false,
  })),
  on(EmpathyMapActions.createEmpathyMapFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmpathyMapActions.updateEmpathyMap, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmpathyMapActions.updateEmpathyMapSuccess, (state, { entry }) => ({
    ...state,
    entries: state.entries.map((e) => (e.id === entry.id ? entry : e)),
    loading: false,
  })),
  on(EmpathyMapActions.updateEmpathyMapFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmpathyMapActions.deleteEmpathyMap, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmpathyMapActions.deleteEmpathyMapSuccess, (state, { entryId }) => ({
    ...state,
    entries: state.entries.filter((e) => e.id !== entryId),
    loading: false,
  })),
  on(EmpathyMapActions.deleteEmpathyMapFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmpathyMapActions.upvoteEmpathyMap, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmpathyMapActions.upvoteEmpathyMapSuccess, (state, { entry }) => ({
    ...state,
    entries: state.entries.map((e) => (e.id === entry.id ? entry : e)),
    loading: false,
  })),
  on(EmpathyMapActions.upvoteEmpathyMapFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmpathyMapActions.toggleEmpathyMapSelection, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    EmpathyMapActions.toggleEmpathyMapSelectionSuccess,
    (state, { entry }) => ({
      ...state,
      entries: state.entries.map((e) => (e.id === entry.id ? entry : e)),
      loading: false,
    })
  ),
  on(
    EmpathyMapActions.toggleEmpathyMapSelectionFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  ),
  on(EmpathyMapActions.createResponse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmpathyMapActions.createResponsesSuccess, (state, { responses }) => ({
    ...state,
    responses: [...responses, ...state.responses],
    loading: false,
  })),
  on(EmpathyMapActions.createResponseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmpathyMapActions.loadResponses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmpathyMapActions.loadResponsesSuccess, (state, { responses }) => ({
    ...state,
    responses,
    loading: false,
  })),
  on(EmpathyMapActions.loadResponsesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmpathyMapActions.upvoteResponse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmpathyMapActions.upvoteResponseSuccess, (state, { response }) => ({
    ...state,
    responses: state.responses.map((r) =>
      r.id === response.id ? response : r
    ),
    loading: false,
  })),
  on(EmpathyMapActions.upvoteResponseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmpathyMapActions.removeUpvoteResponse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmpathyMapActions.removeUpvoteResponseSuccess, (state, { response }) => ({
    ...state,
    responses: state.responses.map((r) =>
      r.id === response.id ? response : r
    ),
    loading: false,
  })),
  on(EmpathyMapActions.removeUpvoteResponseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmpathyMapActions.toggleResponseSelection, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    EmpathyMapActions.toggleResponseSelectionSuccess,
    (state, { response }) => ({
      ...state,
      responses: state.responses.map((r) =>
        r.id === response.id ? response : r
      ),
      loading: false,
    })
  ),
  on(EmpathyMapActions.toggleResponseSelectionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(EmpathyMapActions.deleteResponseSuccess, (state, { id }) => ({
    ...state,
    responses: state.responses.filter((response) => response.id !== id),
  })),
  on(EmpathyMapActions.deleteResponseFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(EmpathyMapActions.updateResponse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmpathyMapActions.updateResponseSuccess, (state, { response }) => ({
    ...state,
    responses: state.responses.map((r) =>
      r.id === response.id ? response : r
    ),
    loading: false,
  })),
  on(EmpathyMapActions.updateResponseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
