import { createAction, props } from '@ngrx/store';
import {
  CreateIdeationIdeaDto,
  CreateIdeationPointDto,
  IdeationIdea,
  IdeationPoint,
  IdeationPointType,
  UpdateIdeationIdeaDto,
  UpdateIdeationPointDto,
} from '../../common/interfaces/ideation.interface';

// IDEA Actions
export const loadIdeasByProject = createAction(
  '[Ideation] Load Ideas By Project',
  props<{ projectId: number; userId?: number }>()
);

export const loadIdeasByProjectSuccess = createAction(
  '[Ideation] Load Ideas By Project Success',
  props<{ ideas: IdeationIdea[] }>()
);

export const loadIdeasByProjectFailure = createAction(
  '[Ideation] Load Ideas By Project Failure',
  props<{ error: any }>()
);

export const createIdea = createAction(
  '[Ideation] Create Idea',
  props<{ title: string; projectId: number; userId: number }>()
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
  props<{ id: number; userId: number; update: UpdateIdeationIdeaDto }>()
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
  props<{ id: number; userId: number }>()
);

export const deleteIdeaSuccess = createAction(
  '[Ideation] Delete Idea Success',
  props<{ id: number }>()
);

export const deleteIdeaFailure = createAction(
  '[Ideation] Delete Idea Failure',
  props<{ error: any }>()
);

export const upvoteIdea = createAction(
  '[Ideation] Upvote Idea',
  props<{ id: number; userId: number }>()
);

export const upvoteIdeaSuccess = createAction(
  '[Ideation] Upvote Idea Success',
  props<{ idea: IdeationIdea }>()
);

export const upvoteIdeaFailure = createAction(
  '[Ideation] Upvote Idea Failure',
  props<{ error: any }>()
);

export const toggleIdeaSelection = createAction(
  '[Ideation] Toggle Idea Selection',
  props<{ id: number; userId: number }>()
);

export const toggleIdeaSelectionSuccess = createAction(
  '[Ideation] Toggle Idea Selection Success',
  props<{ idea: IdeationIdea }>()
);

export const toggleIdeaSelectionFailure = createAction(
  '[Ideation] Toggle Idea Selection Failure',
  props<{ error: any }>()
);

export const loadSelectedIdeas = createAction(
  '[Ideation] Load Selected Ideas',
  props<{ projectId: number }>()
);

export const loadSelectedIdeasSuccess = createAction(
  '[Ideation] Load Selected Ideas Success',
  props<{ ideas: IdeationIdea[] }>()
);

export const loadSelectedIdeasFailure = createAction(
  '[Ideation] Load Selected Ideas Failure',
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
  props<{
    content: string;
    pointType: IdeationPointType;
    ideaId: number;
    userId: number;
  }>()
);

export const createPointSuccess = createAction(
  '[Ideation] Create Point Success',
  props<{ point: IdeationPoint; ideaId: number }>()
);

export const createPointFailure = createAction(
  '[Ideation] Create Point Failure',
  props<{ error: any }>()
);

export const updatePoint = createAction(
  '[Ideation] Update Point',
  props<{ id: number; userId: number; update: UpdateIdeationPointDto }>()
);

export const updatePointSuccess = createAction(
  '[Ideation] Update Point Success',
  props<{ point: IdeationPoint; ideaId: number }>()
);

export const updatePointFailure = createAction(
  '[Ideation] Update Point Failure',
  props<{ error: any }>()
);

export const deletePoint = createAction(
  '[Ideation] Delete Point',
  props<{ id: number; userId: number; ideaId: number }>()
);

export const deletePointSuccess = createAction(
  '[Ideation] Delete Point Success',
  props<{ id: number; ideaId: number }>()
);

export const deletePointFailure = createAction(
  '[Ideation] Delete Point Failure',
  props<{ error: any }>()
);

export const upvotePoint = createAction(
  '[Ideation] Upvote Point',
  props<{ id: number; userId: number; ideaId: number }>()
);

export const upvotePointSuccess = createAction(
  '[Ideation] Upvote Point Success',
  props<{ point: IdeationPoint; ideaId: number }>()
);

export const upvotePointFailure = createAction(
  '[Ideation] Upvote Point Failure',
  props<{ error: any }>()
);
