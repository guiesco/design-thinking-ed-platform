import { createReducer, on } from '@ngrx/store';
import { Project } from '../../common/interfaces/project.interface';
import * as ProjectActions from './project.actions';

export interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: any;
}

export const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

export const projectReducer = createReducer(
  initialState,
  on(ProjectActions.loadProjects, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProjectActions.loadProjectsSuccess, (state, { projects }) => ({
    ...state,
    projects,
    loading: false,
    error: null,
  })),
  on(ProjectActions.loadProjectsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ProjectActions.loadProject, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProjectActions.loadProjectSuccess, (state, { project }) => ({
    ...state,
    currentProject: project,
    loading: false,
    error: null,
  })),
  on(ProjectActions.loadProjectFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ProjectActions.createProject, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProjectActions.createProjectSuccess, (state, { project }) => ({
    ...state,
    projects: [...state.projects, project],
    loading: false,
    error: null,
  })),
  on(ProjectActions.createProjectFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ProjectActions.updateProject, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProjectActions.updateProjectSuccess, (state, { project }) => ({
    ...state,
    projects: state.projects.map((p) => (p.id === project.id ? project : p)),
    currentProject:
      state.currentProject?.id === project.id ? project : state.currentProject,
    loading: false,
    error: null,
  })),
  on(ProjectActions.updateProjectFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ProjectActions.deleteProject, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ProjectActions.deleteProjectSuccess, (state, { id }) => ({
    ...state,
    projects: state.projects.filter((p) => p.id !== id),
    currentProject:
      state.currentProject?.id === id ? null : state.currentProject,
    loading: false,
    error: null,
  })),
  on(ProjectActions.deleteProjectFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
