import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectState } from './project.reducer';

export const selectProjectState =
  createFeatureSelector<ProjectState>('project');

export const selectProjects = createSelector(
  selectProjectState,
  (state) => state.projects
);

export const selectCurrentProject = createSelector(
  selectProjectState,
  (state) => state.currentProject
);

export const selectLoading = createSelector(
  selectProjectState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectProjectState,
  (state) => state.error
);
