import { createAction, props } from '@ngrx/store';
import { ProblemDefinitionResponse } from '../../common/interfaces/problem-definition-response.interface';

export const loadProblemDefinitionResponses = createAction(
  '[Problem Definition] Load Responses',
  props<{ projectId: string }>()
);

export const loadProblemDefinitionResponsesSuccess = createAction(
  '[Problem Definition] Load Responses Success',
  props<{ responses: ProblemDefinitionResponse[] }>()
);

export const loadProblemDefinitionResponsesFailure = createAction(
  '[Problem Definition] Load Responses Failure',
  props<{ error: string }>()
);

export const createProblemDefinitionResponse = createAction(
  '[Problem Definition] Create Response',
  props<{ response: Omit<ProblemDefinitionResponse, 'id'> }>()
);

export const createProblemDefinitionResponseSuccess = createAction(
  '[Problem Definition] Create Response Success',
  props<{ response: ProblemDefinitionResponse }>()
);

export const createProblemDefinitionResponseFailure = createAction(
  '[Problem Definition] Create Response Failure',
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
  props<{ responseId: string }>()
);

export const deleteProblemDefinitionResponseSuccess = createAction(
  '[Problem Definition] Delete Response Success',
  props<{ responseId: string }>()
);

export const deleteProblemDefinitionResponseFailure = createAction(
  '[Problem Definition] Delete Response Failure',
  props<{ error: string }>()
);

export const upvoteProblemDefinitionResponse = createAction(
  '[Problem Definition] Upvote Response',
  props<{ responseId: string }>()
);

export const upvoteProblemDefinitionResponseSuccess = createAction(
  '[Problem Definition] Upvote Response Success',
  props<{ response: ProblemDefinitionResponse }>()
);

export const upvoteProblemDefinitionResponseFailure = createAction(
  '[Problem Definition] Upvote Response Failure',
  props<{ error: string }>()
);
