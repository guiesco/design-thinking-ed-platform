import {
  ProblemDefinition,
  ProblemDefinitionResponse,
} from '../../common/interfaces/problem-definition-response.interface';

export interface ProblemDefinitionState {
  responses: ProblemDefinitionResponse[];
  problemDefinition: ProblemDefinition | null;
  loading: boolean;
  error: string | null;
}

export const initialState: ProblemDefinitionState = {
  responses: [],
  problemDefinition: null,
  loading: false,
  error: null,
};
