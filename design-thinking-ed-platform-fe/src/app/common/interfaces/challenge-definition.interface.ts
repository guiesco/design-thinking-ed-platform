export interface ChallengeDefinition {
  id: number;
  problems: string[];
  targetAudience: string[];
  howWeCan: string[];
  brainstorm: string[];
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  projectId: number;
}
