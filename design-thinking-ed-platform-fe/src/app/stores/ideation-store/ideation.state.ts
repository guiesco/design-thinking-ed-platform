import {
  IdeationIdea,
  IdeationPoint,
} from '../../common/interfaces/ideation.interface';

export interface IdeationState {
  ideas: IdeationIdea[];
  loading: boolean;
  error: any;
}

export const initialIdeationState: IdeationState = {
  ideas: [],
  loading: false,
  error: null,
};
