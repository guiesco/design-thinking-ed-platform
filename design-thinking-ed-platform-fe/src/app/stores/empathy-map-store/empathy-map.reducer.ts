import { createReducer, on } from '@ngrx/store';
import { EmpathyMapEntry } from 'src/app/stores/empathy-map-store/empathy-map.service';
import * as EmpathyMapActions from './empathy-map.actions';

export interface EmpathyMapState {
  entries: EmpathyMapEntry[];
  loading: boolean;
  error: any;
}

export const initialState: EmpathyMapState = {
  entries: [],
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
  on(EmpathyMapActions.downvoteEmpathyMap, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(EmpathyMapActions.downvoteEmpathyMapSuccess, (state, { entry }) => ({
    ...state,
    entries: state.entries.map((e) => (e.id === entry.id ? entry : e)),
    loading: false,
  })),
  on(EmpathyMapActions.downvoteEmpathyMapFailure, (state, { error }) => ({
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
  )
);
