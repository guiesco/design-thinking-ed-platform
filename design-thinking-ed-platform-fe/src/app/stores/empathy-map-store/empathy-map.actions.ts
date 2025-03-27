import { createAction, props } from '@ngrx/store';
import {
  EmpathyMapEntry,
  CreateEmpathyMapDto,
  EmpathyMapResponse,
  CreateEmpathyMapResponseDto,
} from 'src/app/stores/empathy-map-store/empathy-map.service';

export const loadEmpathyMaps = createAction(
  '[EmpathyMap] Load Empathy Maps',
  props<{ projectId: number }>()
);

export const loadEmpathyMapsSuccess = createAction(
  '[EmpathyMap] Load Empathy Maps Success',
  props<{ entries: EmpathyMapEntry[] }>()
);

export const loadEmpathyMapsFailure = createAction(
  '[EmpathyMap] Load Empathy Maps Failure',
  props<{ error: any }>()
);

export const createEmpathyMap = createAction(
  '[EmpathyMap] Create Empathy Map',
  props<{ entry: EmpathyMapEntry }>()
);

export const createEmpathyMapSuccess = createAction(
  '[EmpathyMap] Create Empathy Map Success',
  props<{ entry: EmpathyMapEntry }>()
);

export const createEmpathyMapFailure = createAction(
  '[EmpathyMap] Create Empathy Map Failure',
  props<{ error: any }>()
);

export const updateEmpathyMap = createAction(
  '[EmpathyMap] Update Empathy Map',
  props<{ entry: EmpathyMapEntry }>()
);

export const updateEmpathyMapSuccess = createAction(
  '[EmpathyMap] Update Empathy Map Success',
  props<{ entry: EmpathyMapEntry }>()
);

export const updateEmpathyMapFailure = createAction(
  '[EmpathyMap] Update Empathy Map Failure',
  props<{ error: any }>()
);

export const deleteEmpathyMap = createAction(
  '[EmpathyMap] Delete Empathy Map',
  props<{ entryId: number }>()
);

export const deleteEmpathyMapSuccess = createAction(
  '[EmpathyMap] Delete Empathy Map Success',
  props<{ entryId: number }>()
);

export const deleteEmpathyMapFailure = createAction(
  '[EmpathyMap] Delete Empathy Map Failure',
  props<{ error: any }>()
);

export const upvoteEmpathyMap = createAction(
  '[Empathy Map] Upvote Entry',
  props<{ entryId: number; userId: number }>()
);

export const upvoteEmpathyMapSuccess = createAction(
  '[EmpathyMap] Upvote Empathy Map Success',
  props<{ entry: EmpathyMapEntry }>()
);

export const upvoteEmpathyMapFailure = createAction(
  '[EmpathyMap] Upvote Empathy Map Failure',
  props<{ error: any }>()
);

export const toggleEmpathyMapSelection = createAction(
  '[EmpathyMap] Toggle Empathy Map Selection',
  props<{ entryId: number }>()
);

export const toggleEmpathyMapSelectionSuccess = createAction(
  '[EmpathyMap] Toggle Empathy Map Selection Success',
  props<{ entry: EmpathyMapEntry }>()
);

export const toggleEmpathyMapSelectionFailure = createAction(
  '[EmpathyMap] Toggle Empathy Map Selection Failure',
  props<{ error: any }>()
);

// Novas actions para respostas
export const createResponse = createAction(
  '[EmpathyMap] Create Response',
  props<{ response: CreateEmpathyMapResponseDto }>()
);

export const createResponseSuccess = createAction(
  '[EmpathyMap] Create Response Success',
  props<{ response: EmpathyMapResponse }>()
);

export const createResponseFailure = createAction(
  '[EmpathyMap] Create Response Failure',
  props<{ error: any }>()
);

export const loadResponses = createAction(
  '[EmpathyMap] Load Responses',
  props<{ projectId: number; userId?: number }>()
);

export const loadResponsesSuccess = createAction(
  '[EmpathyMap] Load Responses Success',
  props<{ responses: EmpathyMapResponse[] }>()
);

export const loadResponsesFailure = createAction(
  '[EmpathyMap] Load Responses Failure',
  props<{ error: any }>()
);

export const deleteResponse = createAction(
  '[EmpathyMap] Delete Response',
  props<{ id: number; userId: number }>()
);

export const deleteResponseSuccess = createAction(
  '[EmpathyMap] Delete Response Success',
  props<{ id: number }>()
);

export const deleteResponseFailure = createAction(
  '[EmpathyMap] Delete Response Failure',
  props<{ error: any }>()
);

export const upvoteResponse = createAction(
  '[Empathy Map] Upvote Response',
  props<{ responseId: number; userId: number }>()
);

export const upvoteResponseSuccess = createAction(
  '[EmpathyMap] Upvote Response Success',
  props<{ response: EmpathyMapResponse }>()
);

export const upvoteResponseFailure = createAction(
  '[EmpathyMap] Upvote Response Failure',
  props<{ error: any }>()
);

export const removeUpvoteResponse = createAction(
  '[Empathy Map] Remove Upvote Response',
  props<{ responseId: number; userId: number }>()
);

export const removeUpvoteResponseSuccess = createAction(
  '[EmpathyMap] Remove Upvote Response Success',
  props<{ response: EmpathyMapResponse }>()
);

export const removeUpvoteResponseFailure = createAction(
  '[EmpathyMap] Remove Upvote Response Failure',
  props<{ error: any }>()
);

export const toggleResponseSelection = createAction(
  '[EmpathyMap] Toggle Response Selection',
  props<{ responseId: number }>()
);

export const toggleResponseSelectionSuccess = createAction(
  '[EmpathyMap] Toggle Response Selection Success',
  props<{ response: EmpathyMapResponse }>()
);

export const toggleResponseSelectionFailure = createAction(
  '[EmpathyMap] Toggle Response Selection Failure',
  props<{ error: any }>()
);
