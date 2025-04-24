import { createAction, props } from '@ngrx/store';
import { ChallengeDefinitionResponse } from '../../common/interfaces/challenge-definition-response.interface';
import { CreateChallengeDefinitionResponseDto } from '../../common/interfaces/create-challenge-definition-response.interface';
import { ResponseType } from '../../common/interfaces/challenge-definition-response.interface';
import { ChallengeDefinition } from '../../common/interfaces/challenge-definition.interface';

export const loadResponses = createAction(
  '[Challenge Definition] Load Responses',
  props<{ projectId: number; userId?: number }>()
);

export const loadResponsesSuccess = createAction(
  '[Challenge Definition] Load Responses Success',
  props<{ responses: ChallengeDefinitionResponse[] }>()
);

export const loadResponsesFailure = createAction(
  '[Challenge Definition] Load Responses Failure',
  props<{ error: string }>()
);

export const loadFinalChallengeDefinition = createAction(
  '[Challenge Definition] Load Final Challenge Definition',
  props<{ projectId: number }>()
);

export const loadFinalChallengeDefinitionSuccess = createAction(
  '[Challenge Definition] Load Final Challenge Definition Success',
  props<{ challengeDefinition: ChallengeDefinition }>()
);

export const loadFinalChallengeDefinitionFailure = createAction(
  '[Challenge Definition] Load Final Challenge Definition Failure',
  props<{ error: string }>()
);

export const createResponse = createAction(
  '[Challenge Definition] Create Response',
  props<{ response: CreateChallengeDefinitionResponseDto }>()
);

export const createResponseSuccess = createAction(
  '[Challenge Definition] Create Response Success',
  props<{ response: ChallengeDefinitionResponse }>()
);

export const createResponseFailure = createAction(
  '[Challenge Definition] Create Response Failure',
  props<{ error: string }>()
);

export const createResponses = createAction(
  '[Challenge Definition] Create Responses',
  props<{ responses: CreateChallengeDefinitionResponseDto[] }>()
);

export const createResponsesSuccess = createAction(
  '[Challenge Definition] Create Responses Success',
  props<{ responses: ChallengeDefinitionResponse[] }>()
);

export const createResponsesFailure = createAction(
  '[Challenge Definition] Create Responses Failure',
  props<{ error: string }>()
);

export const upvoteResponse = createAction(
  '[Challenge Definition] Upvote Response',
  props<{ responseId: number; userId: number }>()
);

export const upvoteResponseSuccess = createAction(
  '[Challenge Definition] Upvote Response Success',
  props<{ response: ChallengeDefinitionResponse }>()
);

export const upvoteResponseFailure = createAction(
  '[Challenge Definition] Upvote Response Failure',
  props<{ error: string }>()
);

export const removeVote = createAction(
  '[Challenge Definition] Remove Vote',
  props<{ responseId: number; userId: number }>()
);

export const removeVoteSuccess = createAction(
  '[Challenge Definition] Remove Vote Success',
  props<{ response: ChallengeDefinitionResponse }>()
);

export const removeVoteFailure = createAction(
  '[Challenge Definition] Remove Vote Failure',
  props<{ error: string }>()
);

export const toggleResponseSelection = createAction(
  '[Challenge Definition] Toggle Response Selection',
  props<{ responseId: number; userId: number }>()
);

export const toggleResponseSelectionSuccess = createAction(
  '[Challenge Definition] Toggle Response Selection Success',
  props<{ response: ChallengeDefinitionResponse }>()
);

export const toggleResponseSelectionFailure = createAction(
  '[Challenge Definition] Toggle Response Selection Failure',
  props<{ error: string }>()
);

export const updateResponse = createAction(
  '[Challenge Definition] Update Response',
  props<{ id: number; content: string; userId: number }>()
);

export const updateResponseSuccess = createAction(
  '[Challenge Definition] Update Response Success',
  props<{ response: ChallengeDefinitionResponse }>()
);

export const updateResponseFailure = createAction(
  '[Challenge Definition] Update Response Failure',
  props<{ error: string }>()
);

export const deleteResponse = createAction(
  '[Challenge Definition] Delete Response',
  props<{ id: number; userId: number }>()
);

export const deleteResponseSuccess = createAction(
  '[Challenge Definition] Delete Response Success',
  props<{ id: number }>()
);

export const deleteResponseFailure = createAction(
  '[Challenge Definition] Delete Response Failure',
  props<{ error: string }>()
);

export const createChallengeDefinition = createAction(
  '[Challenge Definition] Create Challenge Definition',
  props<{ challengeDefinition: ChallengeDefinition }>()
);

export const createChallengeDefinitionSuccess = createAction(
  '[Challenge Definition] Create Challenge Definition Success',
  props<{ challengeDefinition: ChallengeDefinition }>()
);

export const createChallengeDefinitionFailure = createAction(
  '[Challenge Definition] Create Challenge Definition Failure',
  props<{ error: string }>()
);
