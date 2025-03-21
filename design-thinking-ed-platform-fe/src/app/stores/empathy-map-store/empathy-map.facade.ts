import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  EmpathyMapEntry,
  EmpathyMapResponse,
  CreateEmpathyMapResponseDto,
  ResponseType,
} from 'src/app/stores/empathy-map-store/empathy-map.service';
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

  upvoteEmpathyMap(entryId: number): void {
    this.store.dispatch(EmpathyMapActions.upvoteEmpathyMap({ entryId }));
  }

  downvoteEmpathyMap(entryId: number): void {
    this.store.dispatch(EmpathyMapActions.downvoteEmpathyMap({ entryId }));
  }

  toggleEmpathyMapSelection(entryId: number): void {
    this.store.dispatch(
      EmpathyMapActions.toggleEmpathyMapSelection({ entryId })
    );
  }

  // Novos métodos para respostas
  createResponse(response: CreateEmpathyMapResponseDto): void {
    this.store.dispatch(EmpathyMapActions.createResponse({ response }));
  }

  loadResponses(projectId: number): void {
    this.store.dispatch(EmpathyMapActions.loadResponses({ projectId }));
  }

  upvoteResponse(responseId: number): void {
    this.store.dispatch(EmpathyMapActions.upvoteResponse({ responseId }));
  }

  downvoteResponse(responseId: number): void {
    this.store.dispatch(EmpathyMapActions.downvoteResponse({ responseId }));
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
