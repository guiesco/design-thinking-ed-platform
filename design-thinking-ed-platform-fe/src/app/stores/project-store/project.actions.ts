import { createAction, props } from '@ngrx/store';
import { Project } from '../../common/interfaces/project.interface';

export const loadProjects = createAction('[Project] Load Projects');
export const loadProjectsSuccess = createAction(
  '[Project] Load Projects Success',
  props<{ projects: Project[] }>()
);
export const loadProjectsFailure = createAction(
  '[Project] Load Projects Failure',
  props<{ error: string }>()
);

export const loadProject = createAction(
  '[Project] Load Project',
  props<{ id: number }>()
);
export const loadProjectSuccess = createAction(
  '[Project] Load Project Success',
  props<{ project: Project }>()
);
export const loadProjectFailure = createAction(
  '[Project] Load Project Failure',
  props<{ error: string }>()
);

export const createProject = createAction(
  '[Project] Create Project',
  props<{ project: Partial<Project> }>()
);
export const createProjectSuccess = createAction(
  '[Project] Create Project Success',
  props<{ project: Project }>()
);
export const createProjectFailure = createAction(
  '[Project] Create Project Failure',
  props<{ error: string }>()
);

export const updateProject = createAction(
  '[Project] Update Project',
  props<{ id: number; project: Partial<Project> }>()
);
export const updateProjectSuccess = createAction(
  '[Project] Update Project Success',
  props<{ project: Project }>()
);
export const updateProjectFailure = createAction(
  '[Project] Update Project Failure',
  props<{ error: string }>()
);

export const deleteProject = createAction(
  '[Project] Delete Project',
  props<{ id: number }>()
);
export const deleteProjectSuccess = createAction(
  '[Project] Delete Project Success',
  props<{ id: number }>()
);
export const deleteProjectFailure = createAction(
  '[Project] Delete Project Failure',
  props<{ error: string }>()
);
