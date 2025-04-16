import { ProblemDefinitionResponse } from '../../common/interfaces/problem-definition-response.interface';

export interface ProblemDefinitionState {
  responses: ProblemDefinitionResponse[];
  loading: boolean;
  error: string | null;
}

export const initialState: ProblemDefinitionState = {
  responses: [],
  loading: false,
  error: null,
};
