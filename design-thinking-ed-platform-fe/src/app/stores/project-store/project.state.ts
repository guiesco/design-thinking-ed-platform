import { Project } from '../../common/interfaces/project.interface';

export interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};
