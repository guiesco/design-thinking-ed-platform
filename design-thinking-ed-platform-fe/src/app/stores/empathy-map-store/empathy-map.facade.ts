import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  CreateEmpathyMapResponseDto,
  EmpathyMapEntry,
  EmpathyMapResponse,
  ResponseType,
} from 'src/app/common/interfaces/empathy-map.interface';
import * as EmpathyMapActions from './empathy-map.actions';
import * as EmpathyMapSelectors from './empathy-map.selectors';

@Injectable({
  providedIn: 'root',
})
export class EmpathyMapFacade {
  entries$: Observable<EmpathyMapEntry[]> = this.store.select(
    EmpathyMapSelectors.selectAllEntries
  );
  responses$: Observable<EmpathyMapResponse[]> = this.store.select(
    EmpathyMapSelectors.selectAllResponses
  );
  loading$: Observable<boolean> = this.store.select(
    EmpathyMapSelectors.selectLoading
  );
  error$: Observable<any> = this.store.select(EmpathyMapSelectors.selectError);

  constructor(private store: Store) {}

  loadEmpathyMaps(projectId: number): void {
    this.store.dispatch(EmpathyMapActions.loadEmpathyMaps({ projectId }));
  }

  createEmpathyMap(entry: EmpathyMapEntry): void {
    this.store.dispatch(EmpathyMapActions.createEmpathyMap({ entry }));
  }

  updateEmpathyMap(entry: EmpathyMapEntry): void {
    this.store.dispatch(EmpathyMapActions.updateEmpathyMap({ entry }));
  }

  deleteEmpathyMap(entryId: number): void {
    this.store.dispatch(EmpathyMapActions.deleteEmpathyMap({ entryId }));
  }

  // Novos métodos para respostas
  createResponse(response: CreateEmpathyMapResponseDto): void {
    this.store.dispatch(EmpathyMapActions.createResponse({ response }));
  }

  createResponses(responses: CreateEmpathyMapResponseDto[]): void {
    this.store.dispatch(EmpathyMapActions.createResponses({ responses }));
  }

  updateResponse(id: number, userId: number, content: string): void {
    this.store.dispatch(
      EmpathyMapActions.updateResponse({ id, userId, content })
    );
  }

  loadResponses(projectId: number, userId?: number): void {
    this.store.dispatch(EmpathyMapActions.loadResponses({ projectId, userId }));
  }

  upvoteResponse(responseId: number, userId: number): void {
    this.store.dispatch(
      EmpathyMapActions.upvoteResponse({ responseId, userId })
    );
  }

  removeUpvoteResponse(responseId: number, userId: number): void {
    this.store.dispatch(
      EmpathyMapActions.removeUpvoteResponse({ responseId, userId })
    );
  }

  toggleResponseSelection(responseId: number): void {
    this.store.dispatch(
      EmpathyMapActions.toggleResponseSelection({ responseId })
    );
  }

  getResponsesByType(type: ResponseType): Observable<EmpathyMapResponse[]> {
    return this.store.select(EmpathyMapSelectors.selectResponsesByType(type));
  }

  getSelectedResponses(): Observable<EmpathyMapResponse[]> {
    return this.store.select(EmpathyMapSelectors.selectSelectedResponses);
  }
}
