import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  CreateIdeationIdeaDto,
  CreateIdeationPointDto,
  IdeationIdea,
  IdeationPoint,
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
  loadIdeasByProject(projectId: number): void {
    this.store.dispatch(IdeationActions.loadIdeasByProject({ projectId }));
  }

  getIdeaById(ideaId: number): Observable<IdeationIdea | undefined> {
    return this.store.select(IdeationSelectors.selectIdeaById(ideaId));
  }

  createIdea(idea: CreateIdeationIdeaDto): void {
    this.store.dispatch(IdeationActions.createIdea({ idea }));
  }

  updateIdea(ideaId: number, update: UpdateIdeationIdeaDto): void {
    this.store.dispatch(IdeationActions.updateIdea({ ideaId, update }));
  }

  deleteIdea(ideaId: number): void {
    this.store.dispatch(IdeationActions.deleteIdea({ ideaId }));
  }

  upvoteIdea(ideaId: number, userId: number): void {
    this.store.dispatch(IdeationActions.upvoteIdea({ ideaId, userId }));
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

  createPoint(point: CreateIdeationPointDto): void {
    this.store.dispatch(IdeationActions.createPoint({ point }));
  }

  updatePoint(pointId: number, update: UpdateIdeationPointDto): void {
    this.store.dispatch(IdeationActions.updatePoint({ pointId, update }));
  }

  deletePoint(pointId: number): void {
    this.store.dispatch(IdeationActions.deletePoint({ pointId }));
  }

  upvotePoint(pointId: number, userId: number): void {
    this.store.dispatch(IdeationActions.upvotePoint({ pointId, userId }));
  }
}
