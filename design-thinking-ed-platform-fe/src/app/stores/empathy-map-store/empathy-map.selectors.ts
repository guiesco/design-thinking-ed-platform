import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmpathyMapState } from './empathy-map.state';
import { ResponseType } from '../../common/interfaces/empathy-map.interface';

export const selectEmpathyMapState =
  createFeatureSelector<EmpathyMapState>('empathyMap');

export const selectEmpathyMapEntries = createSelector(
  selectEmpathyMapState,
  (state) => state.entries
);

export const selectEmpathyMapResponses = createSelector(
  selectEmpathyMapState,
  (state) => state.responses
);

export const selectEmpathyMap = createSelector(
  selectEmpathyMapState,
  (state) => state.empathyMap
);

export const selectEmpathyMapLoading = createSelector(
  selectEmpathyMapState,
  (state) => state.loading
);

export const selectEmpathyMapError = createSelector(
  selectEmpathyMapState,
  (state) => state.error
);

export const selectEmpathyMapResponsesByType = (type: ResponseType) =>
  createSelector(selectEmpathyMapResponses, (responses) =>
    responses.filter((response) => response.type === type)
  );
