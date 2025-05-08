export enum DesignThinkingStage {
  EMPATHY = 'empathy',
  PROBLEM_DEFINITION = 'problem_definition',
  CHALLENGE_DEFINITION = 'challenge_definition',
  IDEATION = 'ideation',
  PROTOTYPING = 'prototyping',
  CONCLUSION = 'conclusion',
  ALL = 'all',
}

export interface StudentMetrics {
  userId: number;
  name: string;
  totalInteractions: number;
  givenLikes: number;
  createdResponses: number;
  selectedResponses: number;
}

export interface ProjectMetricsResponse {
  students: StudentMetrics[];
}

export interface MetricsState {
  isLoading: boolean;
  error: string | null;
  metrics: ProjectMetricsResponse | null;
}
