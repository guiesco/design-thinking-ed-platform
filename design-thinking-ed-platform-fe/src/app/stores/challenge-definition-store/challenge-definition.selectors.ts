import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChallengeDefinitionState } from './challenge-definition.state';
import { ResponseType } from 'src/app/common/interfaces/challenge-definition-response.interface';

export const selectChallengeDefinitionState =
  createFeatureSelector<ChallengeDefinitionState>('challengeDefinition');

export const selectResponses = createSelector(
  selectChallengeDefinitionState,
  (state) => state.responses
);

export const selectChallengeDefinition = createSelector(
  selectChallengeDefinitionState,
  (state) => state.challengeDefinition
);

export const selectLoading = createSelector(
  selectChallengeDefinitionState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectChallengeDefinitionState,
  (state) => state.error
);

export const selectResponsesByType = (type: ResponseType) =>
  createSelector(selectResponses, (responses) =>
    responses.filter((response) => response.type === type)
  );
