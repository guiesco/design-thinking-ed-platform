import { ResponseType } from './challenge-definition-response.interface';

export interface CreateChallengeDefinitionResponseDto {
  type: ResponseType;
  content: string;
  userId: number;
  projectId: number;
}
