import { ChallengeDefinitionResponse } from '../../common/interfaces/challenge-definition-response.interface';
import { ChallengeDefinition } from '../../common/interfaces/challenge-definition.interface';

export interface ChallengeDefinitionState {
  responses: ChallengeDefinitionResponse[];
  challengeDefinition: ChallengeDefinition | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ChallengeDefinitionState = {
  responses: [],
  challengeDefinition: null,
  loading: false,
  error: null,
};
