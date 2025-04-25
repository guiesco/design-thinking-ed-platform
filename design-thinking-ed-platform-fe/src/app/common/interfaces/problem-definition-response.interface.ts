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

export interface ProblemDefinition {
  id: number;
  projectId: number;
  userId: number;
  mainQuestion: string[];
  targetAudience: string[];
  consequences: string[];
  alternativeView: string[];
  socialFactors: string[];
  problemDefinition: string[];
}
