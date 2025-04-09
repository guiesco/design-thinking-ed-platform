import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  ChallengeDefinitionResponse,
  ResponseType,
} from '../../common/interfaces/challenge-definition-response.interface';
import * as ChallengeDefinitionActions from './challenge-definition.actions';
import * as ChallengeDefinitionSelectors from './challenge-definition.selectors';
import { ChallengeDefinitionState } from './challenge-definition.state';
import { ChallengeDefinitionService } from './challenge-definition.service';

@Injectable({
  providedIn: 'root',
})
export class ChallengeDefinitionFacade {
  constructor(
    private store: Store<{ challengeDefinition: ChallengeDefinitionState }>,
    private challengeDefinitionService: ChallengeDefinitionService
  ) {}

  responses$: Observable<ChallengeDefinitionResponse[]> = this.store.select(
    ChallengeDefinitionSelectors.selectResponses
  );

  loading$: Observable<boolean> = this.store.select(
    ChallengeDefinitionSelectors.selectLoading
  );

  error$: Observable<string | null> = this.store.select(
    ChallengeDefinitionSelectors.selectError
  );

  getResponsesByType(
    type: ResponseType
  ): Observable<ChallengeDefinitionResponse[]> {
    return this.store.select(
      ChallengeDefinitionSelectors.selectResponsesByType(type)
    );
  }

  loadResponses(): void {
    this.store.dispatch(ChallengeDefinitionActions.loadResponses());
  }

  createResponse(responseType: ResponseType, content: string): void {
    this.store.dispatch(
      ChallengeDefinitionActions.createResponse({
        responseType,
        content,
      })
    );
  }

  updateResponse(id: number, content: string): void {
    this.store.dispatch(
      ChallengeDefinitionActions.updateResponse({ id, content })
    );
  }

  deleteResponse(id: number): void {
    this.store.dispatch(ChallengeDefinitionActions.deleteResponse({ id }));
  }

  upvoteResponse(id: number): void {
    this.store.dispatch(ChallengeDefinitionActions.upvoteResponse({ id }));
  }

  removeVote(id: number): void {
    this.store.dispatch(ChallengeDefinitionActions.removeVote({ id }));
  }

  toggleResponseSelection(id: number): void {
    this.store.dispatch(
      ChallengeDefinitionActions.toggleResponseSelection({ id })
    );
  }
}
