import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  DesignThinkingStage,
  ProjectMetricsResponse,
} from './metrics.interface';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  private baseUrl = `${environment.apiUrl}/metrics`;

  constructor(private http: HttpClient) {}

  getProjectMetrics(
    projectId: number,
    userId: number,
    stage: DesignThinkingStage = DesignThinkingStage.ALL
  ): Observable<ProjectMetricsResponse> {
    return this.http.get<ProjectMetricsResponse>(
      `${this.baseUrl}/project/${projectId}?userId=${userId}&stage=${stage}`
    );
  }
}
