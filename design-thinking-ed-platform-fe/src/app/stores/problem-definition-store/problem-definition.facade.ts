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

  loadResponses(projectId: number, userId?: number): void {
    this.store.dispatch(
      ProblemDefinitionActions.loadProblemDefinitionResponses({
        projectId,
        userId,
      })
    );
  }

  createResponses(responses: Omit<ProblemDefinitionResponse, 'id'>[]): void {
    this.store.dispatch(
      ProblemDefinitionActions.createProblemDefinitionResponses({ responses })
    );
  }

  updateResponse(response: ProblemDefinitionResponse): void {
    this.store.dispatch(
      ProblemDefinitionActions.updateProblemDefinitionResponse({ response })
    );
  }

  deleteResponse(responseId: number): void {
    this.store.dispatch(
      ProblemDefinitionActions.deleteProblemDefinitionResponse({ responseId })
    );
  }

  upvoteResponse(responseId: number): void {
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
    responseId: number
  ): Observable<ProblemDefinitionResponse | undefined> {
    return this.store.select(
      ProblemDefinitionSelectors.selectProblemDefinitionResponseById(responseId)
    );
  }
}
