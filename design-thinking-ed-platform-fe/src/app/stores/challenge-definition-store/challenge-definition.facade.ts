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

  loadResponses(projectId: number, userId?: number): void {
    this.store.dispatch(
      ChallengeDefinitionActions.loadResponses({ projectId, userId })
    );
  }

  createResponse(
    type: ResponseType,
    content: string,
    userId: number,
    projectId: number
  ): void {
    this.store.dispatch(
      ChallengeDefinitionActions.createResponse({
        responseType: type,
        content,
        userId,
        projectId,
      })
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

  upvoteResponse(id: number, userId: number): void {
    this.store.dispatch(
      ChallengeDefinitionActions.upvoteResponse({ id, userId })
    );
  }

  removeVote(id: number, userId: number): void {
    this.store.dispatch(ChallengeDefinitionActions.removeVote({ id, userId }));
  }

  toggleResponseSelection(id: number, userId: number): void {
    this.store.dispatch(
      ChallengeDefinitionActions.toggleResponseSelection({ id, userId })
    );
  }

  createChallengeDefinition(challengeDefinition: any): void {
    this.store.dispatch(
      ChallengeDefinitionActions.createChallengeDefinition({
        challengeDefinition,
      })
    );
  }
}
