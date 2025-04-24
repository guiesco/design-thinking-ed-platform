import { createReducer, on } from '@ngrx/store';
import * as EmpathyMapActions from './empathy-map.actions';
import { initialState } from './empathy-map.state';

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
    error,
    loading: false,
  })),
  on(EmpathyMapActions.loadFinalEmpathyMap, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmpathyMapActions.loadFinalEmpathyMapSuccess, (state, { empathyMap }) => ({
    ...state,
    empathyMap,
    loading: false,
  })),
  on(EmpathyMapActions.loadFinalEmpathyMapFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(EmpathyMapActions.createEmpathyMap, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmpathyMapActions.createEmpathyMapSuccess, (state, { entry }) => ({
    ...state,
    empathyMap: entry,
    loading: false,
  })),
  on(EmpathyMapActions.createEmpathyMapFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
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
    error,
    loading: false,
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
    error,
    loading: false,
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
    error,
    loading: false,
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
      error,
      loading: false,
    })
  ),
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
    error,
    loading: false,
  })),
  on(EmpathyMapActions.createResponse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmpathyMapActions.createResponseSuccess, (state, { response }) => ({
    ...state,
    responses: [...state.responses, response],
    loading: false,
  })),
  on(EmpathyMapActions.createResponseFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(EmpathyMapActions.createResponses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmpathyMapActions.createResponsesSuccess, (state, { responses }) => ({
    ...state,
    responses: [...state.responses, ...responses],
    loading: false,
  })),
  on(EmpathyMapActions.createResponsesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
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
    error,
    loading: false,
  })),
  on(EmpathyMapActions.deleteResponse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmpathyMapActions.deleteResponseSuccess, (state, { id }) => ({
    ...state,
    responses: state.responses.filter((r) => r.id !== id),
    loading: false,
  })),
  on(EmpathyMapActions.deleteResponseFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
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
    error,
    loading: false,
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
    error,
    loading: false,
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
    error,
    loading: false,
  }))
);
