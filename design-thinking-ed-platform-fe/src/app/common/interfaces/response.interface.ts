import { ResponseType as EmpathyMapResponseType } from 'src/app/common/interfaces/empathy-map.interface';
import { ResponseType as ChallengeResponseType } from './challenge-definition-response.interface';
import { IUser } from './user.interface';
import { ProblemDefinitionQuadrant } from '../enum/problem-definition-quadrant.enum';

export type ResponseTypeUnion =
  | EmpathyMapResponseType
  | ChallengeResponseType
  | ProblemDefinitionQuadrant
  | string;

export interface IResponse {
  id: number;
  type: ResponseTypeUnion;
  content: string;
  userId: number;
  user?: IUser;
  projectId: number;
  upvotes: number;
  isSelected?: boolean;
  hasVoted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
