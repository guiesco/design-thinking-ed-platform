import { ProblemDefinitionQuadrant } from '../enum/problem-definition-quadrant.enum';

export interface ProblemDefinitionResponse {
  id: string;
  projectId: string;
  userId: string;
  quadrant: ProblemDefinitionQuadrant;
  content: string;
  upvotes: number;
  createdAt: Date;
  updatedAt: Date;
}
