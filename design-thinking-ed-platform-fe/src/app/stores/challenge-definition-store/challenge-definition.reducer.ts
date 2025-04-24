import { createReducer, on } from '@ngrx/store';
import { ChallengeDefinitionState } from './challenge-definition.state';
import * as ChallengeDefinitionActions from './challenge-definition.actions';
import { ChallengeDefinitionResponse } from '../../common/interfaces/challenge-definition-response.interface';

export const initialState: ChallengeDefinitionState = {
  responses: [],
  loading: false,
  error: null,
  challengeDefinition: null,
};

export const challengeDefinitionReducer = createReducer(
  initialState,

  on(ChallengeDefinitionActions.loadResponses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(
    ChallengeDefinitionActions.loadResponsesSuccess,
    (state, { responses }) => ({
      ...state,
      responses,
      loading: false,
    })
  ),

  on(ChallengeDefinitionActions.loadResponsesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ChallengeDefinitionActions.loadFinalChallengeDefinition, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(
    ChallengeDefinitionActions.loadFinalChallengeDefinitionSuccess,
    (state, { challengeDefinition }) => ({
      ...state,
      challengeDefinition: challengeDefinition[0],
      loading: false,
    })
  ),

  on(
    ChallengeDefinitionActions.loadFinalChallengeDefinitionFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  ),

  on(ChallengeDefinitionActions.createResponse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(
    ChallengeDefinitionActions.createResponseSuccess,
    (state, { response }) => ({
      ...state,
      responses: [...state.responses, response],
      loading: false,
    })
  ),

  on(ChallengeDefinitionActions.createResponseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ChallengeDefinitionActions.createResponses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(
    ChallengeDefinitionActions.createResponsesSuccess,
    (state, { responses }) => ({
      ...state,
      responses: [...state.responses, ...responses],
      loading: false,
    })
  ),

  on(ChallengeDefinitionActions.createResponsesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ChallengeDefinitionActions.updateResponse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(
    ChallengeDefinitionActions.updateResponseSuccess,
    (state, { response }) => ({
      ...state,
      responses: state.responses.map((r) =>
        r.id === response.id ? response : r
      ),
      loading: false,
    })
  ),

  on(ChallengeDefinitionActions.updateResponseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ChallengeDefinitionActions.deleteResponse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ChallengeDefinitionActions.deleteResponseSuccess, (state, { id }) => ({
    ...state,
    responses: state.responses.filter((r) => r.id !== id),
    loading: false,
  })),

  on(ChallengeDefinitionActions.deleteResponseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ChallengeDefinitionActions.upvoteResponse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(
    ChallengeDefinitionActions.upvoteResponseSuccess,
    (state, { response }) => ({
      ...state,
      responses: state.responses.map((r) =>
        r.id === response.id ? response : r
      ),
      loading: false,
    })
  ),

  on(ChallengeDefinitionActions.upvoteResponseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ChallengeDefinitionActions.removeVote, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ChallengeDefinitionActions.removeVoteSuccess, (state, { response }) => ({
    ...state,
    responses: state.responses.map((r) =>
      r.id === response.id ? response : r
    ),
    loading: false,
  })),

  on(ChallengeDefinitionActions.removeVoteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ChallengeDefinitionActions.toggleResponseSelection, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(
    ChallengeDefinitionActions.toggleResponseSelectionSuccess,
    (state, { response }) => ({
      ...state,
      responses: state.responses.map((r) =>
        r.id === response.id ? response : r
      ),
      loading: false,
    })
  ),

  on(
    ChallengeDefinitionActions.toggleResponseSelectionFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  ),

  on(ChallengeDefinitionActions.createChallengeDefinition, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(
    ChallengeDefinitionActions.createChallengeDefinitionSuccess,
    (state, { challengeDefinition }) => ({
      ...state,
      challengeDefinition,
      loading: false,
    })
  ),

  on(
    ChallengeDefinitionActions.createChallengeDefinitionFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  )
);
