export enum ResponseType {
  PROBLEMS = 'PROBLEMS',
  TARGET_AUDIENCE = 'TARGET_AUDIENCE',
  HOW_WE_CAN = 'HOW_WE_CAN',
  BRAINSTORM = 'BRAINSTORM',
}

export interface ChallengeDefinitionResponse {
  id: number;
  type: ResponseType;
  content: string;
  isSelected: boolean;
  upvotes: number;
  hasVoted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
