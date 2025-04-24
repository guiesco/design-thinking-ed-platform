import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ProblemDefinition,
  ProblemDefinitionResponse,
} from 'src/app/common/interfaces/problem-definition-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProblemDefinitionService {
  private apiUrl = `${environment.apiUrl}/problem-definition`;

  constructor(private http: HttpClient) {}

  getResponses(
    projectId: number,
    userId?: number
  ): Observable<ProblemDefinitionResponse[]> {
    return this.http.get<ProblemDefinitionResponse[]>(
      `${this.apiUrl}/project/${projectId}/responses?userId=${userId}`
    );
  }

  getProblemDefinition(projectId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/project/${projectId}`);
  }

  createResponses(
    responses: Omit<ProblemDefinitionResponse, 'id'>[]
  ): Observable<ProblemDefinitionResponse[]> {
    return this.http.post<ProblemDefinitionResponse[]>(
      `${this.apiUrl}/responses`,
      { responses }
    );
  }

  updateResponse(
    response: ProblemDefinitionResponse
  ): Observable<ProblemDefinitionResponse> {
    return this.http.put<ProblemDefinitionResponse>(
      `${this.apiUrl}/response/${response.id}`,
      response
    );
  }

  deleteResponse(responseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/response/${responseId}`);
  }

  upvoteResponse(
    responseId: number,
    userId: number
  ): Observable<ProblemDefinitionResponse> {
    return this.http.put<ProblemDefinitionResponse>(
      `${this.apiUrl}/response/${responseId}/upvote?userId=${userId}`,
      {}
    );
  }

  toggleResponseSelection(
    responseId: number,
    userId: number
  ): Observable<ProblemDefinitionResponse> {
    return this.http.put<ProblemDefinitionResponse>(
      `${this.apiUrl}/response/${responseId}/toggle-selection`,
      { userId }
    );
  }

  createProblemDefinition(
    problemDefinition: any
  ): Observable<ProblemDefinition[]> {
    return this.http.post<ProblemDefinition[]>(
      `${this.apiUrl}`,
      problemDefinition
    );
  }
}
