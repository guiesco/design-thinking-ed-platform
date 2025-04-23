import { createAction, props } from '@ngrx/store';
import { ProblemDefinitionResponse } from '../../common/interfaces/problem-definition-response.interface';

export const loadProblemDefinitionResponses = createAction(
  '[Problem Definition] Load Responses',
  props<{ projectId: number; userId?: number }>()
);

export const loadProblemDefinitionResponsesSuccess = createAction(
  '[Problem Definition] Load Responses Success',
  props<{ responses: ProblemDefinitionResponse[] }>()
);

export const loadProblemDefinitionResponsesFailure = createAction(
  '[Problem Definition] Load Responses Failure',
  props<{ error: string }>()
);

export const createProblemDefinitionResponses = createAction(
  '[Problem Definition] Create Responses',
  props<{ responses: Omit<ProblemDefinitionResponse, 'id'>[] }>()
);

export const createProblemDefinitionResponsesSuccess = createAction(
  '[Problem Definition] Create Responses Success',
  props<{ responses: ProblemDefinitionResponse[] }>()
);

export const createProblemDefinitionResponsesFailure = createAction(
  '[Problem Definition] Create Responses Failure',
  props<{ error: string }>()
);

export const updateProblemDefinitionResponse = createAction(
  '[Problem Definition] Update Response',
  props<{ response: ProblemDefinitionResponse }>()
);

export const updateProblemDefinitionResponseSuccess = createAction(
  '[Problem Definition] Update Response Success',
  props<{ response: ProblemDefinitionResponse }>()
);

export const updateProblemDefinitionResponseFailure = createAction(
  '[Problem Definition] Update Response Failure',
  props<{ error: string }>()
);

export const deleteProblemDefinitionResponse = createAction(
  '[Problem Definition] Delete Response',
  props<{ responseId: number }>()
);

export const deleteProblemDefinitionResponseSuccess = createAction(
  '[Problem Definition] Delete Response Success',
  props<{ responseId: number }>()
);

export const deleteProblemDefinitionResponseFailure = createAction(
  '[Problem Definition] Delete Response Failure',
  props<{ error: string }>()
);

export const upvoteProblemDefinitionResponse = createAction(
  '[Problem Definition] Upvote Response',
  props<{ responseId: number; userId: number }>()
);

export const upvoteProblemDefinitionResponseSuccess = createAction(
  '[Problem Definition] Upvote Response Success',
  props<{ response: ProblemDefinitionResponse }>()
);

export const upvoteProblemDefinitionResponseFailure = createAction(
  '[Problem Definition] Upvote Response Failure',
  props<{ error: string }>()
);

export const createProblemDefinition = createAction(
  '[Problem Definition] Create Problem Definition',
  props<{ problemDefinition: any }>()
);

export const createProblemDefinitionSuccess = createAction(
  '[Problem Definition] Create Problem Definition Success',
  props<{ problemDefinition: any }>()
);

export const createProblemDefinitionFailure = createAction(
  '[Problem Definition] Create Problem Definition Failure',
  props<{ error: string }>()
);

export const toggleProblemDefinitionResponseSelection = createAction(
  '[Problem Definition] Toggle Response Selection',
  props<{ responseId: number; userId: number }>()
);

export const toggleProblemDefinitionResponseSelectionSuccess = createAction(
  '[Problem Definition] Toggle Response Selection Success',
  props<{ response: ProblemDefinitionResponse }>()
);

export const toggleProblemDefinitionResponseSelectionFailure = createAction(
  '[Problem Definition] Toggle Response Selection Failure',
  props<{ error: string }>()
);
