import { ResponseType as EmpathyMapResponseType } from 'src/app/stores/empathy-map-store/empathy-map.service';
import { IUser } from './user.interface';
import { IResponse } from './response.interface';

export enum ResponseType {
  PROBLEMS = 'PROBLEMS',
  TARGET_AUDIENCE = 'TARGET_AUDIENCE',
  HOW_WE_CAN = 'HOW_WE_CAN',
  BRAINSTORM = 'BRAINSTORM',
}

export interface ChallengeDefinitionResponse extends Omit<IResponse, 'type'> {
  type: ResponseType;
}
