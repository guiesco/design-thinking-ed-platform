import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectMetricsResponse } from './metrics.interface';

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProjectMetrics(
    projectId: number,
    userId: number
  ): Observable<ProjectMetricsResponse> {
    return this.http.get<ProjectMetricsResponse>(
      `${this.baseUrl}/metrics/project/${projectId}?userId=${userId}`
    );
  }
}
