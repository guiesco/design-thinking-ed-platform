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
