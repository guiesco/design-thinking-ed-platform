import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupStoreModel } from './group.model';

export const selectState = createFeatureSelector<GroupStoreModel>('group');

export const groupSelector = createSelector(
  selectState,
  (state: GroupStoreModel) => state.groups
);
