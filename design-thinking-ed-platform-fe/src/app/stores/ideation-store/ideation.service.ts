import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateIdeationIdeaDto,
  CreateIdeationPointDto,
  IdeationIdea,
  IdeationPoint,
  UpdateIdeationIdeaDto,
  UpdateIdeationPointDto,
} from '../../common/interfaces/ideation.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IdeationService {
  private apiUrl = `${environment.apiUrl}/ideation`;

  constructor(private http: HttpClient) {}

  // Ideation Ideas
  getIdeasByProject(
    projectId: number,
    userId?: number
  ): Observable<IdeationIdea[]> {
    let url = `${this.apiUrl}/idea?projectId=${projectId}`;
    if (userId) {
      url += `&userId=${userId}`;
    }
    return this.http.get<IdeationIdea[]>(url);
  }

  getIdeaById(id: number): Observable<IdeationIdea> {
    return this.http.get<IdeationIdea>(`${this.apiUrl}/idea/${id}`);
  }

  createIdea(idea: CreateIdeationIdeaDto): Observable<IdeationIdea> {
    return this.http.post<IdeationIdea>(`${this.apiUrl}/idea`, idea);
  }

  updateIdea(
    id: number,
    userId: number,
    idea: UpdateIdeationIdeaDto
  ): Observable<IdeationIdea> {
    return this.http.put<IdeationIdea>(
      `${this.apiUrl}/idea/${id}?userId=${userId}`,
      idea
    );
  }

  deleteIdea(id: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/idea/${id}?userId=${userId}`);
  }

  upvoteIdea(id: number, userId: number): Observable<IdeationIdea> {
    return this.http.post<IdeationIdea>(
      `${this.apiUrl}/idea/${id}/upvote?userId=${userId}`,
      {}
    );
  }

  toggleIdeaSelection(id: number, userId: number): Observable<IdeationIdea> {
    return this.http.post<IdeationIdea>(
      `${this.apiUrl}/idea/${id}/toggle-selection?userId=${userId}`,
      {}
    );
  }

  getSelectedIdeasByProject(projectId: number): Observable<IdeationIdea[]> {
    return this.http.get<IdeationIdea[]>(
      `${this.apiUrl}/selected?projectId=${projectId}`
    );
  }

  // Ideation Points
  getPointsByIdea(ideaId: number): Observable<IdeationPoint[]> {
    return this.http.get<IdeationPoint[]>(
      `${this.apiUrl}/point?ideaId=${ideaId}`
    );
  }

  createPoint(point: CreateIdeationPointDto): Observable<IdeationPoint> {
    return this.http.post<IdeationPoint>(`${this.apiUrl}/point`, point);
  }

  updatePoint(
    id: number,
    userId: number,
    point: UpdateIdeationPointDto
  ): Observable<IdeationPoint> {
    return this.http.put<IdeationPoint>(
      `${this.apiUrl}/point/${id}?userId=${userId}`,
      point
    );
  }

  deletePoint(id: number, userId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/point/${id}?userId=${userId}`
    );
  }

  upvotePoint(id: number, userId: number): Observable<IdeationPoint> {
    return this.http.post<IdeationPoint>(
      `${this.apiUrl}/point/${id}/upvote?userId=${userId}`,
      {}
    );
  }
}
