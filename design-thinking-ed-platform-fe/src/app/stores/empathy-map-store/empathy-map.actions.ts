import { createAction, props } from '@ngrx/store';
import {
  EmpathyMapEntry,
  CreateEmpathyMapDto,
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
  '[EmpathyMap] Upvote Empathy Map',
  props<{ entryId: number }>()
);

export const upvoteEmpathyMapSuccess = createAction(
  '[EmpathyMap] Upvote Empathy Map Success',
  props<{ entry: EmpathyMapEntry }>()
);

export const upvoteEmpathyMapFailure = createAction(
  '[EmpathyMap] Upvote Empathy Map Failure',
  props<{ error: any }>()
);

export const downvoteEmpathyMap = createAction(
  '[EmpathyMap] Downvote Empathy Map',
  props<{ entryId: number }>()
);

export const downvoteEmpathyMapSuccess = createAction(
  '[EmpathyMap] Downvote Empathy Map Success',
  props<{ entry: EmpathyMapEntry }>()
);

export const downvoteEmpathyMapFailure = createAction(
  '[EmpathyMap] Downvote Empathy Map Failure',
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
