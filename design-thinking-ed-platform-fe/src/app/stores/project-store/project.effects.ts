import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
// import { ProjectService } from './project.service';
import * as ProjectActions from './project.actions';
import { Project } from 'src/app/common/interfaces/project.interface';

@Injectable()
export class ProjectEffects {
  constructor(private actions$: Actions) {}

  // loadProjects$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ProjectActions.loadProjects),
  //     mergeMap(() =>
  //       this.projectService.getProjects().pipe(
  //         map((projects) => ProjectActions.loadProjectsSuccess({ projects })),
  //         catchError((error) =>
  //           of(ProjectActions.loadProjectsFailure({ error }))
  //         )
  //       )
  //     )
  //   )
  // );

  // loadProject$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ProjectActions.loadProject),
  //     mergeMap(({ id }) =>
  //       this.projectService.getProject(id).pipe(
  //         map((project) => ProjectActions.loadProjectSuccess({ project })),
  //         catchError((error) =>
  //           of(ProjectActions.loadProjectFailure({ error }))
  //         )
  //       )
  //     )
  //   )
  // );

  // createProject$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ProjectActions.createProject),
  //     mergeMap(({ project }) =>
  //       this.projectService.createProject(project).pipe(
  //         map((newProject: Project) =>
  //           ProjectActions.createProjectSuccess({ project: newProject })
  //         ),
  //         catchError((error) =>
  //           of(ProjectActions.createProjectFailure({ error }))
  //         )
  //       )
  //     )
  //   )
  // );

  // updateProject$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ProjectActions.updateProject),
  //     mergeMap(({ id, project }) =>
  //       this.projectService.updateProject(id, project).pipe(
  //         map((updatedProject: Project) =>
  //           ProjectActions.updateProjectSuccess({ project: updatedProject })
  //         ),
  //         catchError((error) =>
  //           of(ProjectActions.updateProjectFailure({ error }))
  //         )
  //       )
  //     )
  //   )
  // );

  // deleteProject$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ProjectActions.deleteProject),
  //     mergeMap(({ id }) =>
  //       this.projectService.deleteProject(id).pipe(
  //         map(() => ProjectActions.deleteProjectSuccess({ id })),
  //         catchError((error) =>
  //           of(ProjectActions.deleteProjectFailure({ error }))
  //         )
  //       )
  //     )
  //   )
  // );
}
