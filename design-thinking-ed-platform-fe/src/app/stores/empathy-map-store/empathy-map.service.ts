import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser } from '../../common/interfaces/user.interface';

export enum ResponseType {
  THINK = 'think',
  FEEL = 'feel',
  SAY = 'say',
  DO = 'do',
  PAINS = 'pains',
  NEEDS = 'needs',
}

export interface EmpathyMapEntry {
  id: number;
  think: string;
  feel: string;
  say: string;
  do: string;
  pains: string;
  needs: string;
  userId: number;
  user?: IUser;
  projectId: number;
  upvotes: number;
  isSelected: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmpathyMapResponse {
  id: number;
  type: ResponseType;
  content: string;
  userId: number;
  user?: IUser;
  projectId: number;
  upvotes: number;
  isSelected: boolean;
  hasVoted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEmpathyMapDto {
  think: string;
  feel: string;
  say: string;
  do: string;
  pains: string;
  needs: string;
  userId: number;
  projectId: number;
}

export interface CreateEmpathyMapResponseDto {
  type: ResponseType;
  content: string;
  userId: number;
  projectId: number;
}

@Injectable({
  providedIn: 'root',
})
export class EmpathyMapService {
  private apiUrl = `${environment.apiUrl}/empathy-map`;

  constructor(private http: HttpClient) {}

  getEmpathyMaps(projectId: number): Observable<EmpathyMapEntry[]> {
    return this.http.get<EmpathyMapEntry[]>(
      `${this.apiUrl}/project/${projectId}`
    );
  }

  createEmpathyMap(entry: EmpathyMapEntry): Observable<EmpathyMapEntry> {
    return this.http.post<EmpathyMapEntry>(this.apiUrl, entry);
  }

  updateEmpathyMap(entry: EmpathyMapEntry): Observable<EmpathyMapEntry> {
    return this.http.put<EmpathyMapEntry>(`${this.apiUrl}/${entry.id}`, entry);
  }

  deleteEmpathyMap(entryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${entryId}`);
  }

  upvoteEmpathyMap(
    entryId: number,
    userId: number
  ): Observable<EmpathyMapEntry> {
    return this.http.put<EmpathyMapEntry>(
      `${this.apiUrl}/${entryId}/upvote?userId=${userId}`,
      {}
    );
  }

  toggleEmpathyMapSelection(entryId: number): Observable<EmpathyMapEntry> {
    return this.http.post<EmpathyMapEntry>(
      `${this.apiUrl}/${entryId}/toggle-selection`,
      {}
    );
  }

  findAllByProject(projectId: number): Observable<EmpathyMapEntry[]> {
    return this.http.get<EmpathyMapEntry[]>(
      `${this.apiUrl}/project/${projectId}`
    );
  }

  findOne(id: number): Observable<EmpathyMapEntry> {
    return this.http.get<EmpathyMapEntry>(`${this.apiUrl}/${id}`);
  }

  getSelectedByProject(projectId: number): Observable<EmpathyMapEntry[]> {
    return this.http.get<EmpathyMapEntry[]>(
      `${this.apiUrl}/project/${projectId}/selected`
    );
  }

  // Novos métodos para respostas
  createResponse(
    response: CreateEmpathyMapResponseDto
  ): Observable<EmpathyMapResponse> {
    return this.http.post<EmpathyMapResponse>(
      `${this.apiUrl}/response`,
      response
    );
  }

  createResponses(
    responses: CreateEmpathyMapResponseDto[]
  ): Observable<EmpathyMapResponse[]> {
    return this.http.post<EmpathyMapResponse[]>(`${this.apiUrl}/responses`, {
      responses,
    });
  }

  updateResponse(
    id: number,
    userId: number,
    content: string
  ): Observable<EmpathyMapResponse> {
    return this.http.put<EmpathyMapResponse>(
      `${this.apiUrl}/response/${id}`,
      { content },
      { params: { userId: userId.toString() } }
    );
  }

  findAllResponsesByProject(
    projectId: number,
    userId?: number
  ): Observable<EmpathyMapResponse[]> {
    const url = `${this.apiUrl}/project/${projectId}/responses${
      userId ? `?userId=${userId}` : ''
    }`;
    return this.http.get<EmpathyMapResponse[]>(url);
  }

  findOneResponse(id: number): Observable<EmpathyMapResponse> {
    return this.http.get<EmpathyMapResponse>(`${this.apiUrl}/response/${id}`);
  }

  deleteResponse(id: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/response/${id}`, {
      params: { userId: userId.toString() },
    });
  }

  upvoteResponse(
    responseId: number,
    userId: number
  ): Observable<EmpathyMapResponse> {
    return this.http.put<EmpathyMapResponse>(
      `${this.apiUrl}/response/${responseId}/upvote?userId=${userId}`,
      {}
    );
  }

  removeUpvoteResponse(
    responseId: number,
    userId: number
  ): Observable<EmpathyMapResponse> {
    return this.http.delete<EmpathyMapResponse>(
      `${this.apiUrl}/response/${responseId}/upvote?userId=${userId}`,
      {}
    );
  }

  toggleResponseSelection(id: number): Observable<EmpathyMapResponse> {
    return this.http.put<EmpathyMapResponse>(
      `${this.apiUrl}/response/${id}/toggle-selection`,
      {}
    );
  }

  getSelectedResponsesByProject(
    projectId: number
  ): Observable<EmpathyMapResponse[]> {
    return this.http.get<EmpathyMapResponse[]>(
      `${this.apiUrl}/project/${projectId}/selected-responses`
    );
  }

  getResponsesByType(
    projectId: number,
    type: 'think' | 'feel' | 'say' | 'do' | 'pains' | 'needs'
  ): Observable<EmpathyMapResponse[]> {
    return this.http.get<EmpathyMapResponse[]>(
      `${this.apiUrl}/project/${projectId}/responses/${type}`
    );
  }
}
