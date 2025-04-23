import { ProblemDefinitionQuadrant } from '../enum/problem-definition-quadrant.enum';

export interface ProblemDefinitionResponse {
  id: number;
  projectId: number;
  userId: number;
  type: ProblemDefinitionQuadrant;
  content: string;
  upvotes: number;
  isSelected?: boolean;
  hasVoted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
