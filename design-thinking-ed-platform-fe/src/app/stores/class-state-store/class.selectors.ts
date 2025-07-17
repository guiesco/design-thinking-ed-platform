import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClassStoreModel } from './class.model';

export const selectState = createFeatureSelector<ClassStoreModel>('class');

export const classSelector = createSelector(
  selectState,
  (state: ClassStoreModel) => state.classes
);

export const selectedClassSelector = createSelector(
  selectState,
  (state: ClassStoreModel) => state.selectedClass
);

export const classLoadingSelector = createSelector(
  selectState,
  (state: ClassStoreModel) => state.loading
);

export const classErrorSelector = createSelector(
  selectState,
  (state: ClassStoreModel) => state.error
);
