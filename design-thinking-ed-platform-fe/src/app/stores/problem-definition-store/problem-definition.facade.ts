import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProblemDefinitionResponse } from '../../common/interfaces/problem-definition-response.interface';
import { ProblemDefinitionQuadrant } from '../../common/enum/problem-definition-quadrant.enum';
import * as ProblemDefinitionActions from './problem-definition.actions';
import * as ProblemDefinitionSelectors from './problem-definition.selectors';

@Injectable({
  providedIn: 'root',
})
export class ProblemDefinitionFacade {
  responses$: Observable<ProblemDefinitionResponse[]> = this.store.select(
    ProblemDefinitionSelectors.selectProblemDefinitionResponses
  );
  loading$: Observable<boolean> = this.store.select(
    ProblemDefinitionSelectors.selectProblemDefinitionLoading
  );
  error$: Observable<string | null> = this.store.select(
    ProblemDefinitionSelectors.selectProblemDefinitionError
  );

  constructor(private store: Store) {}

  loadResponses(projectId: string): void {
    this.store.dispatch(
      ProblemDefinitionActions.loadProblemDefinitionResponses({ projectId })
    );
  }

  createResponse(response: Omit<ProblemDefinitionResponse, 'id'>): void {
    this.store.dispatch(
      ProblemDefinitionActions.createProblemDefinitionResponse({ response })
    );
  }

  updateResponse(response: ProblemDefinitionResponse): void {
    this.store.dispatch(
      ProblemDefinitionActions.updateProblemDefinitionResponse({ response })
    );
  }

  deleteResponse(responseId: string): void {
    this.store.dispatch(
      ProblemDefinitionActions.deleteProblemDefinitionResponse({ responseId })
    );
  }

  upvoteResponse(responseId: string): void {
    this.store.dispatch(
      ProblemDefinitionActions.upvoteProblemDefinitionResponse({ responseId })
    );
  }

  getResponsesByQuadrant(
    quadrant: ProblemDefinitionQuadrant
  ): Observable<ProblemDefinitionResponse[]> {
    return this.store.select(
      ProblemDefinitionSelectors.selectProblemDefinitionResponsesByQuadrant(
        quadrant
      )
    );
  }

  getResponseById(
    responseId: string
  ): Observable<ProblemDefinitionResponse | undefined> {
    return this.store.select(
      ProblemDefinitionSelectors.selectProblemDefinitionResponseById(responseId)
    );
  }
}
