import { createAction, props } from '@ngrx/store';
import {
  CreateIdeationIdeaDto,
  CreateIdeationPointDto,
  IdeationIdea,
  IdeationPoint,
  UpdateIdeationIdeaDto,
  UpdateIdeationPointDto,
} from '../../common/interfaces/ideation.interface';

// IDEA Actions
export const loadIdeasByProject = createAction(
  '[Ideation] Load Ideas By Project',
  props<{ projectId: number }>()
);

export const loadIdeasSuccess = createAction(
  '[Ideation] Load Ideas Success',
  props<{ ideas: IdeationIdea[] }>()
);

export const loadIdeasFailure = createAction(
  '[Ideation] Load Ideas Failure',
  props<{ error: any }>()
);

export const createIdea = createAction(
  '[Ideation] Create Idea',
  props<{ idea: CreateIdeationIdeaDto }>()
);

export const createIdeaSuccess = createAction(
  '[Ideation] Create Idea Success',
  props<{ idea: IdeationIdea }>()
);

export const createIdeaFailure = createAction(
  '[Ideation] Create Idea Failure',
  props<{ error: any }>()
);

export const updateIdea = createAction(
  '[Ideation] Update Idea',
  props<{ ideaId: number; update: UpdateIdeationIdeaDto }>()
);

export const updateIdeaSuccess = createAction(
  '[Ideation] Update Idea Success',
  props<{ idea: IdeationIdea }>()
);

export const updateIdeaFailure = createAction(
  '[Ideation] Update Idea Failure',
  props<{ error: any }>()
);

export const deleteIdea = createAction(
  '[Ideation] Delete Idea',
  props<{ ideaId: number }>()
);

export const deleteIdeaSuccess = createAction(
  '[Ideation] Delete Idea Success',
  props<{ ideaId: number }>()
);

export const deleteIdeaFailure = createAction(
  '[Ideation] Delete Idea Failure',
  props<{ error: any }>()
);

export const upvoteIdea = createAction(
  '[Ideation] Upvote Idea',
  props<{ ideaId: number; userId: number }>()
);

export const upvoteIdeaSuccess = createAction(
  '[Ideation] Upvote Idea Success',
  props<{ idea: IdeationIdea }>()
);

export const upvoteIdeaFailure = createAction(
  '[Ideation] Upvote Idea Failure',
  props<{ error: any }>()
);

// POINT Actions
export const loadPointsByIdea = createAction(
  '[Ideation] Load Points By Idea',
  props<{ ideaId: number }>()
);

export const loadPointsSuccess = createAction(
  '[Ideation] Load Points Success',
  props<{ points: IdeationPoint[] }>()
);

export const loadPointsFailure = createAction(
  '[Ideation] Load Points Failure',
  props<{ error: any }>()
);

export const createPoint = createAction(
  '[Ideation] Create Point',
  props<{ point: CreateIdeationPointDto }>()
);

export const createPointSuccess = createAction(
  '[Ideation] Create Point Success',
  props<{ point: IdeationPoint }>()
);

export const createPointFailure = createAction(
  '[Ideation] Create Point Failure',
  props<{ error: any }>()
);

export const updatePoint = createAction(
  '[Ideation] Update Point',
  props<{ pointId: number; update: UpdateIdeationPointDto }>()
);

export const updatePointSuccess = createAction(
  '[Ideation] Update Point Success',
  props<{ point: IdeationPoint }>()
);

export const updatePointFailure = createAction(
  '[Ideation] Update Point Failure',
  props<{ error: any }>()
);

export const deletePoint = createAction(
  '[Ideation] Delete Point',
  props<{ pointId: number }>()
);

export const deletePointSuccess = createAction(
  '[Ideation] Delete Point Success',
  props<{ pointId: number }>()
);

export const deletePointFailure = createAction(
  '[Ideation] Delete Point Failure',
  props<{ error: any }>()
);

export const upvotePoint = createAction(
  '[Ideation] Upvote Point',
  props<{ pointId: number; userId: number }>()
);

export const upvotePointSuccess = createAction(
  '[Ideation] Upvote Point Success',
  props<{ point: IdeationPoint }>()
);

export const upvotePointFailure = createAction(
  '[Ideation] Upvote Point Failure',
  props<{ error: any }>()
);
