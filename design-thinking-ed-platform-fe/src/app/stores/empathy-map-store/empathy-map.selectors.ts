import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmpathyMapState, empathyMapReducer } from './empathy-map.reducer';

export const selectEmpathyMapState =
  createFeatureSelector<EmpathyMapState>('empathyMap');

export const selectAllEntries = createSelector(
  selectEmpathyMapState,
  (state: EmpathyMapState) => state.entries
);

export const selectLoading = createSelector(
  selectEmpathyMapState,
  (state: EmpathyMapState) => state.loading
);

export const selectError = createSelector(
  selectEmpathyMapState,
  (state: EmpathyMapState) => state.error
);
