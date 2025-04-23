import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ChallengeDefinitionResponse } from '../../common/interfaces/challenge-definition-response.interface';
import { ResponseType } from '../../common/interfaces/challenge-definition-response.interface';
import { CreateChallengeDefinitionResponseDto } from '../../common/interfaces/create-challenge-definition-response.interface';

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
      `${this.apiUrl}/response/project/${projectId}${
        userId ? `?userId=${userId}` : ''
      }`
    );
  }

  createResponse(
    type: ResponseType,
    content: string,
    userId: number,
    projectId: number
  ): Observable<ChallengeDefinitionResponse> {
    const createResponseDto: CreateResponseDto = {
      type,
      content,
      userId,
      projectId,
    };
    return this.http.post<ChallengeDefinitionResponse>(
      `${this.apiUrl}/response`,
      createResponseDto
    );
  }

  updateResponse(
    id: number,
    content: string,
    userId: number
  ): Observable<ChallengeDefinitionResponse> {
    return this.http.patch<ChallengeDefinitionResponse>(
      `${this.apiUrl}/response/${id}`,
      {
        content,
        userId,
      }
    );
  }

  deleteResponse(id: number, userId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/response/${id}?userId=${userId}`
    );
  }

  upvoteResponse(
    id: number,
    userId: number
  ): Observable<ChallengeDefinitionResponse> {
    return this.http.post<ChallengeDefinitionResponse>(
      `${this.apiUrl}/response/${id}/upvote?userId=${userId}`,
      {}
    );
  }

  removeVote(
    id: number,
    userId: number
  ): Observable<ChallengeDefinitionResponse> {
    return this.http.delete<ChallengeDefinitionResponse>(
      `${this.apiUrl}/response/${id}/upvote?userId=${userId}`
    );
  }

  toggleResponseSelection(
    id: number,
    userId: number
  ): Observable<ChallengeDefinitionResponse> {
    return this.http.post<ChallengeDefinitionResponse>(
      `${this.apiUrl}/response/${id}/toggle-selection?userId=${userId}`,
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
    challengeDefinition: CreateChallengeDefinitionResponseDto
  ): Observable<ChallengeDefinitionResponse> {
    return this.http.post<ChallengeDefinitionResponse>(
      `${this.apiUrl}`,
      challengeDefinition
    );
  }
}
