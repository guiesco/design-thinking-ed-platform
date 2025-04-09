import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ChallengeDefinitionResponse } from '../../common/interfaces/challenge-definition-response.interface';
import { ResponseType } from '../../common/interfaces/challenge-definition-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ChallengeDefinitionService {
  private apiUrl = `${environment.apiUrl}/challenge-definition`;

  constructor(private http: HttpClient) {}

  getResponses(): Observable<ChallengeDefinitionResponse[]> {
    return this.http.get<ChallengeDefinitionResponse[]>(
      `${this.apiUrl}/responses`
    );
  }

  createResponse(
    responseType: ResponseType,
    content: string
  ): Observable<ChallengeDefinitionResponse> {
    return this.http.post<ChallengeDefinitionResponse>(
      `${this.apiUrl}/responses`,
      {
        responseType,
        content,
      }
    );
  }

  updateResponse(
    id: number,
    content: string
  ): Observable<ChallengeDefinitionResponse> {
    return this.http.put<ChallengeDefinitionResponse>(
      `${this.apiUrl}/responses/${id}`,
      {
        content,
      }
    );
  }

  deleteResponse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/responses/${id}`);
  }

  upvoteResponse(id: number): Observable<ChallengeDefinitionResponse> {
    return this.http.post<ChallengeDefinitionResponse>(
      `${this.apiUrl}/responses/${id}/upvote`,
      {}
    );
  }

  removeVote(id: number): Observable<ChallengeDefinitionResponse> {
    return this.http.post<ChallengeDefinitionResponse>(
      `${this.apiUrl}/responses/${id}/remove-vote`,
      {}
    );
  }

  toggleResponseSelection(id: number): Observable<ChallengeDefinitionResponse> {
    return this.http.post<ChallengeDefinitionResponse>(
      `${this.apiUrl}/responses/${id}/toggle-selection`,
      {}
    );
  }
}
