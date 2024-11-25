import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClassStoreModel } from './class.model';

export const selectState = createFeatureSelector<ClassStoreModel>('class');

export const classSelector = createSelector(
  selectState,
  (state: ClassStoreModel) => state.classes
);
