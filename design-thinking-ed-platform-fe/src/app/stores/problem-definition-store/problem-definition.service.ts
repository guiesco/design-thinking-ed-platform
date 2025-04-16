import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProblemDefinitionResponse } from 'src/app/common/interfaces/problem-definition-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProblemDefinitionService {
  private apiUrl = `${environment.apiUrl}/problem-definition`;

  constructor(private http: HttpClient) {}

  getResponses(projectId: string): Observable<ProblemDefinitionResponse[]> {
    return this.http.get<ProblemDefinitionResponse[]>(
      `${this.apiUrl}/responses/${projectId}`
    );
  }

  createResponse(
    response: Omit<ProblemDefinitionResponse, 'id'>
  ): Observable<ProblemDefinitionResponse> {
    return this.http.post<ProblemDefinitionResponse>(
      `${this.apiUrl}/responses`,
      response
    );
  }

  updateResponse(
    response: ProblemDefinitionResponse
  ): Observable<ProblemDefinitionResponse> {
    return this.http.put<ProblemDefinitionResponse>(
      `${this.apiUrl}/responses/${response.id}`,
      response
    );
  }

  deleteResponse(responseId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/responses/${responseId}`);
  }

  upvoteResponse(responseId: string): Observable<ProblemDefinitionResponse> {
    return this.http.post<ProblemDefinitionResponse>(
      `${this.apiUrl}/responses/${responseId}/upvote`,
      {}
    );
  }
}
