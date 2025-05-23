import { createAction, props } from '@ngrx/store';
import {
  EmpathyMapEntry,
  CreateEmpathyMapDto,
  EmpathyMapResponse,
  CreateEmpathyMapResponseDto,
  ResponseType,
} from 'src/app/common/interfaces/empathy-map.interface';

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
  props<{ entry: any }>()
);

export const createEmpathyMapSuccess = createAction(
  '[EmpathyMap] Create Empathy Map Success',
  props<{ entry: any }>()
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
  '[Empathy Map] Create Response',
  props<{ response: CreateEmpathyMapResponseDto }>()
);

export const createResponses = createAction(
  '[Empathy Map] Create Responses',
  props<{ responses: CreateEmpathyMapResponseDto[] }>()
);

export const createResponseSuccess = createAction(
  '[Empathy Map] Create Response Success',
  props<{ response: EmpathyMapResponse }>()
);

export const createResponsesSuccess = createAction(
  '[Empathy Map] Create Responses Success',
  props<{ responses: EmpathyMapResponse[] }>()
);

export const createResponseFailure = createAction(
  '[EmpathyMap] Create Response Failure',
  props<{ error: any }>()
);

export const createResponsesFailure = createAction(
  '[EmpathyMap] Create Responses Failure',
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
  '[Empathy Map] Delete Response',
  props<{ id: number; userId: number }>()
);

export const deleteResponseSuccess = createAction(
  '[Empathy Map] Delete Response Success',
  props<{ id: number }>()
);

export const deleteResponseFailure = createAction(
  '[Empathy Map] Delete Response Failure',
  props<{ error: any }>()
);

export const updateResponse = createAction(
  '[Empathy Map] Update Response',
  props<{ id: number; userId: number; content: string }>()
);

export const updateResponseSuccess = createAction(
  '[Empathy Map] Update Response Success',
  props<{ response: EmpathyMapResponse }>()
);

export const updateResponseFailure = createAction(
  '[Empathy Map] Update Response Failure',
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

// Ações para carregar mapa de empatia final
export const loadFinalEmpathyMap = createAction(
  '[EmpathyMap] Load Final Empathy Map',
  props<{ projectId: number }>()
);

export const loadFinalEmpathyMapSuccess = createAction(
  '[EmpathyMap] Load Final Empathy Map Success',
  props<{ empathyMap: EmpathyMapEntry[] }>()
);

export const loadFinalEmpathyMapFailure = createAction(
  '[EmpathyMap] Load Final Empathy Map Failure',
  props<{ error: any }>()
);
