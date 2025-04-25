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

  // Ideas
  getIdeasByProject(projectId: number): Observable<IdeationIdea[]> {
    return this.http.get<IdeationIdea[]>(
      `${this.apiUrl}/idea?projectId=${projectId}`
    );
  }

  getIdeaById(ideaId: number): Observable<IdeationIdea> {
    return this.http.get<IdeationIdea>(`${this.apiUrl}/idea/${ideaId}`);
  }

  createIdea(idea: CreateIdeationIdeaDto): Observable<IdeationIdea> {
    return this.http.post<IdeationIdea>(`${this.apiUrl}/idea`, idea);
  }

  updateIdea(
    ideaId: number,
    update: UpdateIdeationIdeaDto
  ): Observable<IdeationIdea> {
    return this.http.put<IdeationIdea>(`${this.apiUrl}/idea/${ideaId}`, update);
  }

  deleteIdea(ideaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/idea/${ideaId}`);
  }

  upvoteIdea(ideaId: number, userId: number): Observable<IdeationIdea> {
    return this.http.post<IdeationIdea>(
      `${this.apiUrl}/idea/${ideaId}/upvote`,
      { userId }
    );
  }

  // Points
  getPointsByIdea(ideaId: number): Observable<IdeationPoint[]> {
    return this.http.get<IdeationPoint[]>(
      `${this.apiUrl}/point?ideaId=${ideaId}`
    );
  }

  createPoint(point: CreateIdeationPointDto): Observable<IdeationPoint> {
    return this.http.post<IdeationPoint>(`${this.apiUrl}/point`, point);
  }

  updatePoint(
    pointId: number,
    update: UpdateIdeationPointDto
  ): Observable<IdeationPoint> {
    return this.http.put<IdeationPoint>(
      `${this.apiUrl}/point/${pointId}`,
      update
    );
  }

  deletePoint(pointId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/point/${pointId}`);
  }

  upvotePoint(pointId: number, userId: number): Observable<IdeationPoint> {
    return this.http.post<IdeationPoint>(
      `${this.apiUrl}/point/${pointId}/upvote`,
      { userId }
    );
  }
}
