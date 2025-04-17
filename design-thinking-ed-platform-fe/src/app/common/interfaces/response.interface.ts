import { ResponseType as EmpathyMapResponseType } from 'src/app/stores/empathy-map-store/empathy-map.service';
import { ResponseType as ChallengeResponseType } from './challenge-definition-response.interface';
import { IUser } from './user.interface';

export type ResponseTypeUnion =
  | EmpathyMapResponseType
  | ChallengeResponseType
  | string;

export interface IResponse {
  id: number;
  type: ResponseTypeUnion;
  content: string;
  userId: number;
  user?: IUser;
  projectId: number;
  upvotes: number;
  isSelected: boolean;
  hasVoted: boolean;
  votesCount: number;
  createdAt: Date;
  updatedAt: Date;
}
