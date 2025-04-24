import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ChallengeDefinitionResponse } from '../../common/interfaces/challenge-definition-response.interface';
import { ResponseType } from '../../common/interfaces/challenge-definition-response.interface';
import { CreateChallengeDefinitionResponseDto } from '../../common/interfaces/create-challenge-definition-response.interface';
import { ChallengeDefinition } from 'src/app/common/interfaces/challenge-definition.interface';

interface CreateResponseDto {
  type: ResponseType;
  content: string;
  userId: number;
  projectId: number;
}

@Injectable({
  providedIn: 'root',
})
export class ChallengeDefinitionService {
  private apiUrl = `${environment.apiUrl}/challenge-definition`;

  constructor(private http: HttpClient) {}

  getResponses(
    projectId: number,
    userId?: number
  ): Observable<ChallengeDefinitionResponse[]> {
    return this.http.get<ChallengeDefinitionResponse[]>(
      `${this.apiUrl}/project/${projectId}/responses?userId=${userId}`
    );
  }

  getFinalChallengeDefinition(
    projectId: number
  ): Observable<ChallengeDefinition[]> {
    return this.http.get<ChallengeDefinition[]>(
      `${this.apiUrl}/project/${projectId}`
    );
  }

  createResponse(
    response: CreateChallengeDefinitionResponseDto
  ): Observable<ChallengeDefinitionResponse> {
    return this.http.post<ChallengeDefinitionResponse>(
      `${this.apiUrl}/response`,
      response
    );
  }

  updateResponse(
    responseId: number,
    content: string,
    userId: number
  ): Observable<ChallengeDefinitionResponse> {
    return this.http.put<ChallengeDefinitionResponse>(
      `${this.apiUrl}/response/${responseId}?userId=${userId}`,
      { content }
    );
  }

  deleteResponse(
    responseId: number,
    userId: number
  ): Observable<ChallengeDefinitionResponse> {
    return this.http.delete<ChallengeDefinitionResponse>(
      `${this.apiUrl}/response/${responseId}?userId=${userId}`
    );
  }

  upvoteResponse(
    responseId: number,
    userId: number
  ): Observable<ChallengeDefinitionResponse> {
    return this.http.put<ChallengeDefinitionResponse>(
      `${this.apiUrl}/response/${responseId}/upvote?userId=${userId}`,
      {}
    );
  }

  removeVote(
    responseId: number,
    userId: number
  ): Observable<ChallengeDefinitionResponse> {
    return this.http.delete<ChallengeDefinitionResponse>(
      `${this.apiUrl}/response/${responseId}/upvote?userId=${userId}`
    );
  }

  toggleResponseSelection(
    responseId: number,
    userId: number
  ): Observable<ChallengeDefinitionResponse> {
    return this.http.put<ChallengeDefinitionResponse>(
      `${this.apiUrl}/response/${responseId}/toggle-selection?userId=${userId}`,
      {}
    );
  }

  createResponses(
    responses: CreateChallengeDefinitionResponseDto[]
  ): Observable<ChallengeDefinitionResponse[]> {
    return this.http.post<ChallengeDefinitionResponse[]>(
      `${this.apiUrl}/responses`,
      { responses }
    );
  }

  createChallengeDefinition(
    challengeDefinition: ChallengeDefinition
  ): Observable<ChallengeDefinition> {
    return this.http.post<ChallengeDefinition>(
      `${this.apiUrl}`,
      challengeDefinition
    );
  }
}
