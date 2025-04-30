import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Prototype,
  CreatePrototypeDto,
  UpdatePrototypeDto,
} from './prototype.state';

@Injectable({
  providedIn: 'root',
})
export class PrototypeService {
  private baseUrl = environment.apiUrl + '/prototype';

  constructor(private http: HttpClient) {}

  /**
   * Cria um novo protótipo
   * @param dto Dados do protótipo
   */
  createPrototype(dto: CreatePrototypeDto): Observable<Prototype> {
    return this.http.post<Prototype>(this.baseUrl, dto);
  }

  /**
   * Obtém um protótipo pelo ID
   * @param id ID do protótipo
   */
  getPrototypeById(id: number): Observable<Prototype> {
    return this.http.get<Prototype>(`${this.baseUrl}/${id}`);
  }

  /**
   * Obtém o protótipo pelo ID do projeto
   * @param projectId ID do projeto
   */
  getPrototypeByProject(projectId: number): Observable<Prototype> {
    return this.http.get<Prototype>(`${this.baseUrl}/project/${projectId}`);
  }

  /**
   * Atualiza um protótipo
   * @param id ID do protótipo
   * @param dto Dados para atualização
   */
  updatePrototype(id: number, dto: UpdatePrototypeDto): Observable<Prototype> {
    return this.http.patch<Prototype>(`${this.baseUrl}/${id}`, dto);
  }
}
