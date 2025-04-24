import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmpathyMapState } from './empathy-map.reducer';
import { ResponseType } from 'src/app/common/interfaces/empathy-map.interface';

export const selectEmpathyMapState =
  createFeatureSelector<EmpathyMapState>('empathyMap');

export const selectAllEntries = createSelector(
  selectEmpathyMapState,
  (state: EmpathyMapState) => state.entries
);

export const selectAllResponses = createSelector(
  selectEmpathyMapState,
  (state: EmpathyMapState) => state.responses
);

export const selectResponsesByType = (type: ResponseType) =>
  createSelector(selectAllResponses, (responses) =>
    responses.filter((response) => response.type === type)
  );

export const selectSelectedResponses = createSelector(
  selectAllResponses,
  (responses) => responses.filter((response) => response.isSelected)
);

export const selectLoading = createSelector(
  selectEmpathyMapState,
  (state: EmpathyMapState) => state.loading
);

export const selectError = createSelector(
  selectEmpathyMapState,
  (state: EmpathyMapState) => state.error
);
