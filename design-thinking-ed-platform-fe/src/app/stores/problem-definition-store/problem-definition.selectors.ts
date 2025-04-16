import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProblemDefinitionState } from './problem-definition.state';
import { ProblemDefinitionQuadrant } from '../../common/enum/problem-definition-quadrant.enum';
import { ProblemDefinitionResponse } from '../../common/interfaces/problem-definition-response.interface';

export const selectProblemDefinitionState =
  createFeatureSelector<ProblemDefinitionState>('problemDefinition');

export const selectProblemDefinitionResponses = createSelector(
  selectProblemDefinitionState,
  (state: ProblemDefinitionState) => state.responses
);

export const selectProblemDefinitionLoading = createSelector(
  selectProblemDefinitionState,
  (state: ProblemDefinitionState) => state.loading
);

export const selectProblemDefinitionError = createSelector(
  selectProblemDefinitionState,
  (state: ProblemDefinitionState) => state.error
);

export const selectProblemDefinitionResponsesByQuadrant = (
  quadrant: ProblemDefinitionQuadrant
) =>
  createSelector(selectProblemDefinitionResponses, (responses) =>
    responses.filter((response) => response.quadrant === quadrant)
  );

export const selectProblemDefinitionResponseById = (responseId: string) =>
  createSelector(selectProblemDefinitionResponses, (responses) =>
    responses.find((response) => response.id === responseId)
  );
