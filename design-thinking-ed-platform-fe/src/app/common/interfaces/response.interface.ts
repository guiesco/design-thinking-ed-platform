import { ResponseType } from 'src/app/stores/empathy-map-store/empathy-map.service';
import { IUser } from './user.interface';

export interface IResponse {
  id: number;
  type: ResponseType;
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
