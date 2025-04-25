import {
  IdeationIdea,
  IdeationPoint,
} from '../../common/interfaces/ideation.interface';

export interface IdeationState {
  ideas: IdeationIdea[];
  points: IdeationPoint[];
  loading: boolean;
  error: any;
}

export const initialIdeationState: IdeationState = {
  ideas: [],
  points: [],
  loading: false,
  error: null,
};
