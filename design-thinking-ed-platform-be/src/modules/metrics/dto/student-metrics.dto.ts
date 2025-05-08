export enum DesignThinkingStage {
  EMPATHY = 'empathy',
  PROBLEM_DEFINITION = 'problem_definition',
  CHALLENGE_DEFINITION = 'challenge_definition',
  IDEATION = 'ideation',
  PROTOTYPING = 'prototyping',
  CONCLUSION = 'conclusion',
  ALL = 'all',
}

export class StudentMetricsDto {
  userId: number;
  name: string;
  totalInteractions: number;
  givenLikes: number;
  createdResponses: number;
  selectedResponses: number;
}

export class ProjectMetricsResponseDto {
  students: StudentMetricsDto[];
}

export class MetricsQueryDto {
  stage?: DesignThinkingStage;
}
