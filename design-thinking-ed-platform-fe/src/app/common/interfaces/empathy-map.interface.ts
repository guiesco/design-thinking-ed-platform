import { IUser } from './user.interface';

export enum ResponseType {
  THINK = 'think',
  FEEL = 'feel',
  SAY = 'say',
  DO = 'do',
  PAINS = 'pains',
  NEEDS = 'needs',
}

export enum ResponseTypeLabel {
  THINK = 'Pensar',
  FEEL = 'Sentir',
  SAY = 'Falar',
  DO = 'Fazer',
  PAINS = 'Dores',
  NEEDS = 'Necessidades',
}

export interface EmpathyMapEntry {
  id: number;
  think: string;
  feel: string;
  say: string;
  do: string;
  pains: string;
  needs: string;
  userId: number;
  user?: IUser;
  projectId: number;
  upvotes: number;
  isSelected: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmpathyMapResponse {
  id: number;
  type: ResponseType;
  content: string;
  userId: number;
  user?: IUser;
  projectId: number;
  upvotes: number;
  isSelected: boolean;
  hasVoted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEmpathyMapDto {
  think: string;
  feel: string;
  say: string;
  do: string;
  pains: string;
  needs: string;
  userId: number;
  projectId: number;
}

export interface CreateEmpathyMapResponseDto {
  type: ResponseType;
  content: string;
  userId: number;
  projectId: number;
}
