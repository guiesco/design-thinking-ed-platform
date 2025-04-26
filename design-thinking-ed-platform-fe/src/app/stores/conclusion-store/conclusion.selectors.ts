import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConclusionState } from './conclusion.state';
import { conclusionFeatureKey } from './conclusion.reducer';

export const selectConclusionState =
  createFeatureSelector<ConclusionState>(conclusionFeatureKey);

export const selectConclusion = createSelector(
  selectConclusionState,
  (state) => state.conclusion
);

export const selectFiles = createSelector(
  selectConclusionState,
  (state) => state.files
);

export const selectLoading = createSelector(
  selectConclusionState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectConclusionState,
  (state) => state.error
);
