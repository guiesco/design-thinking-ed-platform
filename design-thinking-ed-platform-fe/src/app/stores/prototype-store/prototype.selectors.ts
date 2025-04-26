import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PrototypeState } from './prototype.state';

export const selectPrototypeState =
  createFeatureSelector<PrototypeState>('prototype');

export const selectPrototype = createSelector(
  selectPrototypeState,
  (state) => state.prototype
);

export const selectFiles = createSelector(
  selectPrototypeState,
  (state) => state.files
);

export const selectLoading = createSelector(
  selectPrototypeState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectPrototypeState,
  (state) => state.error
);

export const selectIsPrototypeCreated = createSelector(
  selectPrototype,
  (prototype) => !!prototype
);
