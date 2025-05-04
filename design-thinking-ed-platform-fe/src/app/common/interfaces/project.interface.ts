import { ChallengeDefinitionResponse } from './challenge-definition-response.interface';
import { ChallengeDefinition } from './challenge-definition.interface';
import { EmpathyMapEntry, EmpathyMapResponse } from './empathy-map.interface';
import { IGroup } from './group.interface';
import { IdeationIdea } from './ideation.interface';
import {
  ProblemDefinition,
  ProblemDefinitionResponse,
} from './problem-definition-response.interface';

export interface Project {
  id: number;
  name: string;
  description: string;
  group: IGroup;

  challengeDefinition: ChallengeDefinition;
  empathyMap: EmpathyMapEntry;
  problemDefinition: ProblemDefinition;

  empathyMapResponses: EmpathyMapResponse[];
  challengeDefinitionResponses: ChallengeDefinitionResponse[];
  problemDefinitionResponses: ProblemDefinitionResponse[];
  ideationIdeas: IdeationIdea[];

  createdAt: Date;
  updatedAt: Date;
}
