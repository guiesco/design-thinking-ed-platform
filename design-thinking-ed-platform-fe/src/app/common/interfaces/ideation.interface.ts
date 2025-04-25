import { IResponse } from './response.interface';
import { IUser } from './user.interface';

export interface IdeationIdea {
  id: number;
  title: string;
  projectId: number;
  userId: number;
  user?: IUser;
  upvotes: number;
  hasVoted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IdeationPoint {
  id: number;
  content: string;
  type: IdeationPointType;
  ideaId: number;
  userId: number;
  user?: IUser;
  upvotes: number;
  hasVoted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum IdeationPointType {
  PRO = 'PRO',
  CON = 'CON',
}

export enum IdeationPointTypeLabel {
  PRO = 'Prós',
  CON = 'Contras',
}

export interface CreateIdeationIdeaDto {
  title: string;
  projectId: number;
  userId: number;
}

export interface CreateIdeationPointDto {
  content: string;
  type: IdeationPointType;
  ideaId: number;
  userId: number;
}

export interface UpdateIdeationIdeaDto {
  title?: string;
}

export interface UpdateIdeationPointDto {
  content?: string;
  type?: IdeationPointType;
}
