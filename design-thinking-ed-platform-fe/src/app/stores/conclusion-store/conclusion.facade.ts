import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  Conclusion,
  CreateConclusionDto,
  UpdateConclusionDto,
} from './conclusion.state';
import * as ConclusionActions from './conclusion.actions';
import * as ConclusionSelectors from './conclusion.selectors';
import { UploadedFile } from '../../common/services/file-upload.service';

@Injectable({
  providedIn: 'root',
})
export class ConclusionFacade {
  conclusion$: Observable<Conclusion | null> = this.store.select(
    ConclusionSelectors.selectConclusion
  );

  files$: Observable<UploadedFile[]> = this.store.select(
    ConclusionSelectors.selectFiles
  );

  loading$: Observable<boolean> = this.store.select(
    ConclusionSelectors.selectLoading
  );

  error$: Observable<string | null> = this.store.select(
    ConclusionSelectors.selectError
  );

  constructor(private store: Store) {}

  /**
   * Cria uma nova conclusão
   * @param dto Dados da conclusão
   */
  createConclusion(dto: CreateConclusionDto): void {
    this.store.dispatch(ConclusionActions.createConclusion({ dto }));
  }

  /**
   * Obtém a conclusão pelo ID do projeto
   * @param projectId ID do projeto
   */
  getConclusionByProject(projectId: number): void {
    this.store.dispatch(
      ConclusionActions.getConclusionByProject({ projectId })
    );
  }

  /**
   * Atualiza uma conclusão
   * @param id ID da conclusão
   * @param dto Dados para atualização
   */
  updateConclusion(id: number, dto: UpdateConclusionDto): void {
    this.store.dispatch(ConclusionActions.updateConclusion({ id, dto }));
  }

  /**
   * Finaliza a etapa de conclusão
   * @param id ID da conclusão
   */
  finalizeConclusion(id: number): void {
    this.store.dispatch(ConclusionActions.finalizeConclusion({ id }));
  }

  /**
   * Carrega os arquivos para o projeto
   * @param projectId ID do projeto
   */
  loadFiles(projectId: number): void {
    this.store.dispatch(ConclusionActions.loadFiles({ projectId }));
  }

  /**
   * Realiza o upload de um arquivo
   * @param file Arquivo a ser enviado
   * @param userId ID do usuário
   * @param projectId ID do projeto
   */
  uploadFile(file: File, userId: number, projectId: number): void {
    this.store.dispatch(
      ConclusionActions.uploadFile({ file, userId, projectId })
    );
  }

  /**
   * Remove um arquivo
   * @param fileId ID do arquivo
   * @param userId ID do usuário
   */
  deleteFile(fileId: number, userId: number): void {
    this.store.dispatch(ConclusionActions.deleteFile({ fileId, userId }));
  }
}
