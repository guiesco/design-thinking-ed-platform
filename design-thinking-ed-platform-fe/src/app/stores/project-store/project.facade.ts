import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Project } from '../../common/interfaces/project.interface';
import { ProjectState } from './project.reducer';
import * as ProjectActions from './project.actions';
import * as ProjectSelectors from './project.selectors';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectFacade {
  constructor(private store: Store<{ project: ProjectState }>) {}

  projects$: Observable<Project[]> = this.store.select(
    ProjectSelectors.selectProjects
  );

  currentProject$: Observable<Project | null> = this.store.select(
    ProjectSelectors.selectCurrentProject
  );

  loading$: Observable<boolean> = this.store.select(
    ProjectSelectors.selectLoading
  );

  error$: Observable<string | null> = this.store.select(
    ProjectSelectors.selectError
  );

  loadProjects(): void {
    this.store.dispatch(ProjectActions.loadProjects());
  }

  loadProject(id: number): void {
    this.store.dispatch(ProjectActions.loadProject({ id }));
  }

  createProject(project: Partial<Project>): void {
    this.store.dispatch(ProjectActions.createProject({ project }));
  }

  updateProject(id: number, project: Partial<Project>): void {
    this.store.dispatch(ProjectActions.updateProject({ id, project }));
  }

  deleteProject(id: number): void {
    this.store.dispatch(ProjectActions.deleteProject({ id }));
  }
}
