import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProblemDefinitionState } from './problem-definition.state';
import { ProblemDefinitionQuadrant } from '../../common/enum/problem-definition-quadrant.enum';
import { ProblemDefinitionResponse } from '../../common/interfaces/problem-definition-response.interface';

export const selectProblemDefinitionState =
  createFeatureSelector<ProblemDefinitionState>('problemDefinition');

export const selectProblemDefinitionResponses = createSelector(
  selectProblemDefinitionState,
  (state) => state.responses
);

export const selectProblemDefinition = createSelector(
  selectProblemDefinitionState,
  (state) => state.problemDefinition
);

export const selectProblemDefinitionLoading = createSelector(
  selectProblemDefinitionState,
  (state) => state.loading
);

export const selectProblemDefinitionError = createSelector(
  selectProblemDefinitionState,
  (state) => state.error
);

export const selectProblemDefinitionResponsesByQuadrant = (
  quadrant: ProblemDefinitionQuadrant
) =>
  createSelector(selectProblemDefinitionResponses, (responses) =>
    responses.filter((response) => response.type === quadrant)
  );

export const selectProblemDefinitionResponseById = (responseId: number) =>
  createSelector(selectProblemDefinitionResponses, (responses) =>
    responses.find((response) => response.id === responseId)
  );
