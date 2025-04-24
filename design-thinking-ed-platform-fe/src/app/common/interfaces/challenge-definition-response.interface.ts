import { IResponse } from './response.interface';

export enum ResponseType {
  PROBLEMS = 'PROBLEMS',
  TARGET_AUDIENCE = 'TARGET_AUDIENCE',
  HOW_WE_CAN = 'HOW_WE_CAN',
  BRAINSTORM = 'BRAINSTORM',
}

export enum ResponseTypeLabel {
  PROBLEMS = 'Problemas',
  TARGET_AUDIENCE = 'Público-alvo',
  HOW_WE_CAN = 'Como podemos',
  BRAINSTORM = 'Ideias',
}

export interface ChallengeDefinitionResponse extends Omit<IResponse, 'type'> {
  type: ResponseType;
}
