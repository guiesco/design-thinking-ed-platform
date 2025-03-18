import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUser } from '../../common/interfaces/user.interface';

export interface EmpathyMapEntry {
  id: number;
  think: string;
  feel: string;
  say: string;
  do: string;
  userId: number;
  user?: IUser;
  projectId: number;
  upvotes: number;
  downvotes: number;
  isSelected: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEmpathyMapDto {
  think: string;
  feel: string;
  say: string;
  do: string;
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

  upvoteEmpathyMap(entryId: number): Observable<EmpathyMapEntry> {
    return this.http.post<EmpathyMapEntry>(
      `${this.apiUrl}/${entryId}/upvote`,
      {}
    );
  }

  downvoteEmpathyMap(entryId: number): Observable<EmpathyMapEntry> {
    return this.http.post<EmpathyMapEntry>(
      `${this.apiUrl}/${entryId}/downvote`,
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
}
