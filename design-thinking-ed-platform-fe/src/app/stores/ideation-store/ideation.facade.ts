import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  CreateIdeationIdeaDto,
  CreateIdeationPointDto,
  IdeationIdea,
  IdeationPoint,
  IdeationPointType,
  UpdateIdeationIdeaDto,
  UpdateIdeationPointDto,
} from '../../common/interfaces/ideation.interface';
import * as IdeationActions from './ideation.actions';
import * as IdeationSelectors from './ideation.selectors';

@Injectable({
  providedIn: 'root',
})
export class IdeationFacade {
  // Ideas observables
  ideas$: Observable<IdeationIdea[]> = this.store.select(
    IdeationSelectors.selectIdeationIdeas
  );

  // Points observables
  allPoints$: Observable<IdeationPoint[]> = this.store.select(
    IdeationSelectors.selectAllPoints
  );

  // Status observables
  loading$: Observable<boolean> = this.store.select(
    IdeationSelectors.selectIdeationLoading
  );

  error$: Observable<any> = this.store.select(
    IdeationSelectors.selectIdeationError
  );

  constructor(private store: Store) {}

  // Ideas methods
  loadIdeasByProject(projectId: number, userId?: number): void {
    this.store.dispatch(
      IdeationActions.loadIdeasByProject({ projectId, userId })
    );
  }

  getIdeaById(ideaId: number): Observable<IdeationIdea | undefined> {
    return this.store.select(IdeationSelectors.selectIdeaById(ideaId));
  }

  createIdea(idea: CreateIdeationIdeaDto): void {
    this.store.dispatch(
      IdeationActions.createIdea({
        title: idea.title,
        projectId: idea.projectId,
        userId: idea.userId,
      })
    );
  }

  updateIdea(id: number, userId: number, update: UpdateIdeationIdeaDto): void {
    this.store.dispatch(IdeationActions.updateIdea({ id, userId, update }));
  }

  deleteIdea(id: number, userId: number): void {
    this.store.dispatch(IdeationActions.deleteIdea({ id, userId }));
  }

  upvoteIdea(id: number, userId: number): void {
    this.store.dispatch(IdeationActions.upvoteIdea({ id, userId }));
  }

  toggleIdeaSelection(id: number, userId: number): void {
    this.store.dispatch(IdeationActions.toggleIdeaSelection({ id, userId }));
  }

  loadSelectedIdeasByProject(projectId: number): void {
    this.store.dispatch(IdeationActions.loadSelectedIdeas({ projectId }));
  }

  // Points methods
  getPointsByIdeaId(ideaId: number): Observable<IdeationPoint[]> {
    return this.store.select(IdeationSelectors.selectPointsByIdeaId(ideaId));
  }

  getProsByIdeaId(ideaId: number): Observable<IdeationPoint[]> {
    return this.store.select(IdeationSelectors.selectProsByIdeaId(ideaId));
  }

  getConsByIdeaId(ideaId: number): Observable<IdeationPoint[]> {
    return this.store.select(IdeationSelectors.selectConsByIdeaId(ideaId));
  }

  loadPointsByIdea(ideaId: number): void {
    this.store.dispatch(IdeationActions.loadPointsByIdea({ ideaId }));
  }

  createPoint(
    content: string,
    type: IdeationPointType,
    ideaId: number,
    userId: number
  ): void {
    this.store.dispatch(
      IdeationActions.createPoint({
        content,
        pointType: type,
        ideaId,
        userId,
      })
    );
  }

  updatePoint(
    id: number,
    userId: number,
    update: UpdateIdeationPointDto
  ): void {
    this.store.dispatch(IdeationActions.updatePoint({ id, userId, update }));
  }

  deletePoint(id: number, userId: number, ideaId: number): void {
    this.store.dispatch(IdeationActions.deletePoint({ id, userId, ideaId }));
  }

  upvotePoint(id: number, userId: number, ideaId: number): void {
    this.store.dispatch(IdeationActions.upvotePoint({ id, userId, ideaId }));
  }
}
