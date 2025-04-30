import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  Prototype,
  CreatePrototypeDto,
  UpdatePrototypeDto,
} from './prototype.state';
import { UploadedFile } from '../../common/services/file-upload.service';
import * as PrototypeActions from './prototype.actions';
import * as PrototypeSelectors from './prototype.selectors';

@Injectable({
  providedIn: 'root',
})
export class PrototypeFacade {
  prototype$: Observable<Prototype | null> = this.store.select(
    PrototypeSelectors.selectPrototype
  );
  files$: Observable<UploadedFile[]> = this.store.select(
    PrototypeSelectors.selectFiles
  );
  loading$: Observable<boolean> = this.store.select(
    PrototypeSelectors.selectLoading
  );
  error$: Observable<string | null> = this.store.select(
    PrototypeSelectors.selectError
  );
  isPrototypeCreated$: Observable<boolean> = this.store.select(
    PrototypeSelectors.selectIsPrototypeCreated
  );

  constructor(private store: Store) {}

  /**
   * Cria um novo protótipo
   * @param dto Dados do protótipo
   */
  createPrototype(dto: CreatePrototypeDto): void {
    this.store.dispatch(PrototypeActions.createPrototype({ dto }));
  }

  /**
   * Obtém o protótipo pelo ID do projeto
   * @param projectId ID do projeto
   */
  getPrototypeByProject(projectId: number): void {
    this.store.dispatch(PrototypeActions.getPrototypeByProject({ projectId }));
  }

  /**
   * Atualiza um protótipo
   * @param id ID do protótipo
   * @param dto Dados para atualização
   */
  updatePrototype(id: number, dto: UpdatePrototypeDto): void {
    this.store.dispatch(PrototypeActions.updatePrototype({ id, dto }));
  }

  /**
   * Carrega os arquivos do projeto
   * @param projectId ID do projeto
   */
  loadFiles(projectId: number): void {
    this.store.dispatch(PrototypeActions.loadFiles({ projectId }));
  }

  /**
   * Faz upload de um arquivo
   * @param file Arquivo a ser enviado
   * @param userId ID do usuário
   * @param projectId ID do projeto
   */
  uploadFile(file: File, userId: number, projectId: number): void {
    this.store.dispatch(
      PrototypeActions.uploadFile({ file, userId, projectId })
    );
  }

  /**
   * Remove um arquivo
   * @param fileId ID do arquivo
   * @param userId ID do usuário
   */
  deleteFile(fileId: number, userId: number): void {
    this.store.dispatch(PrototypeActions.deleteFile({ fileId, userId }));
  }
}
