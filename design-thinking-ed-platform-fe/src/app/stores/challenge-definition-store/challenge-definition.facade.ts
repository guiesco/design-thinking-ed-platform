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
import { CreateChallengeDefinitionResponseDto } from '../../common/interfaces/create-challenge-definition-response.interface';
import { ChallengeDefinition } from '../../common/interfaces/challenge-definition.interface';

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

  challengeDefinition$: Observable<ChallengeDefinition | null> =
    this.store.select(ChallengeDefinitionSelectors.selectChallengeDefinition);

  getResponsesByType(
    type: ResponseType
  ): Observable<ChallengeDefinitionResponse[]> {
    return this.store.select(
      ChallengeDefinitionSelectors.selectResponsesByType(type)
    );
  }

  loadResponses(projectId: number, userId?: number): void {
    this.store.dispatch(
      ChallengeDefinitionActions.loadResponses({ projectId, userId })
    );
  }

  loadFinalChallengeDefinition(projectId: number): void {
    this.store.dispatch(
      ChallengeDefinitionActions.loadFinalChallengeDefinition({ projectId })
    );
  }

  createResponse(response: CreateChallengeDefinitionResponseDto): void {
    this.store.dispatch(
      ChallengeDefinitionActions.createResponse({ response })
    );
  }

  createResponses(responses: CreateChallengeDefinitionResponseDto[]): void {
    this.store.dispatch(
      ChallengeDefinitionActions.createResponses({ responses })
    );
  }

  updateResponse(id: number, content: string, userId: number): void {
    this.store.dispatch(
      ChallengeDefinitionActions.updateResponse({ id, content, userId })
    );
  }

  deleteResponse(id: number, userId: number): void {
    this.store.dispatch(
      ChallengeDefinitionActions.deleteResponse({ id, userId })
    );
  }

  upvoteResponse(responseId: number, userId: number): void {
    this.store.dispatch(
      ChallengeDefinitionActions.upvoteResponse({ responseId, userId })
    );
  }

  removeVote(responseId: number, userId: number): void {
    this.store.dispatch(
      ChallengeDefinitionActions.removeVote({ responseId, userId })
    );
  }

  toggleResponseSelection(responseId: number, userId: number): void {
    this.store.dispatch(
      ChallengeDefinitionActions.toggleResponseSelection({ responseId, userId })
    );
  }

  createChallengeDefinition(challengeDefinition: ChallengeDefinition): void {
    this.store.dispatch(
      ChallengeDefinitionActions.createChallengeDefinition({
        challengeDefinition,
      })
    );
  }
}
