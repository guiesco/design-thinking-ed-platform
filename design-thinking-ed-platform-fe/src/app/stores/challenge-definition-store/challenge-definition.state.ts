import { ChallengeDefinitionResponse } from '../../common/interfaces/challenge-definition-response.interface';

export interface ChallengeDefinitionState {
  responses: ChallengeDefinitionResponse[];
  loading: boolean;
  error: string | null;
}

export const initialState: ChallengeDefinitionState = {
  responses: [],
  loading: false,
  error: null,
};
