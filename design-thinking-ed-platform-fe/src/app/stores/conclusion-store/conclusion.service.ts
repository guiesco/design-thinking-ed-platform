import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Conclusion,
  CreateConclusionDto,
  UpdateConclusionDto,
} from './conclusion.state';

@Injectable({
  providedIn: 'root',
})
export class ConclusionService {
  private baseUrl = environment.apiUrl + '/conclusion';

  constructor(private http: HttpClient) {}

  /**
   * Cria uma nova conclusão
   * @param dto Dados da conclusão
   */
  createConclusion(dto: CreateConclusionDto): Observable<Conclusion> {
    return this.http.post<Conclusion>(this.baseUrl, dto);
  }

  /**
   * Obtém uma conclusão pelo ID
   * @param id ID da conclusão
   */
  getConclusionById(id: number): Observable<Conclusion> {
    return this.http.get<Conclusion>(`${this.baseUrl}/${id}`);
  }

  /**
   * Obtém a conclusão pelo ID do projeto
   * @param projectId ID do projeto
   */
  getConclusionByProject(projectId: number): Observable<Conclusion> {
    return this.http.get<Conclusion>(`${this.baseUrl}/project/${projectId}`);
  }

  /**
   * Atualiza uma conclusão
   * @param id ID da conclusão
   * @param dto Dados para atualização
   */
  updateConclusion(
    id: number,
    dto: UpdateConclusionDto
  ): Observable<Conclusion> {
    return this.http.put<Conclusion>(`${this.baseUrl}/${id}`, dto);
  }
}
