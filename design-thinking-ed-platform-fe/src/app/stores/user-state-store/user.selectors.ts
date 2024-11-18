import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserStoreModel } from './user.model';

export const selectState = createFeatureSelector<UserStoreModel>('user');

export const userSelector = createSelector(
  selectState,
  (state: UserStoreModel) => state.user
);
