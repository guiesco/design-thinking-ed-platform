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
