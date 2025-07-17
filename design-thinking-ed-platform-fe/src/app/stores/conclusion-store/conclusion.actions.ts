import { createAction, props } from '@ngrx/store';
import {
  Conclusion,
  CreateConclusionDto,
  UpdateConclusionDto,
} from './conclusion.state';
import { UploadedFile } from '../../common/services/file-upload.service';

// Ações para Conclusão
export const createConclusion = createAction(
  '[Conclusion] Create Conclusion',
  props<{ dto: CreateConclusionDto }>()
);

export const createConclusionSuccess = createAction(
  '[Conclusion] Create Conclusion Success',
  props<{ conclusion: Conclusion }>()
);

export const createConclusionFailure = createAction(
  '[Conclusion] Create Conclusion Failure',
  props<{ error: string }>()
);

export const getConclusionByProject = createAction(
  '[Conclusion] Get Conclusion By Project',
  props<{ projectId: number }>()
);

export const getConclusionByProjectSuccess = createAction(
  '[Conclusion] Get Conclusion By Project Success',
  props<{ conclusion: Conclusion }>()
);

export const getConclusionByProjectFailure = createAction(
  '[Conclusion] Get Conclusion By Project Failure',
  props<{ error: string }>()
);

export const getConclusionByProjectEmpty = createAction(
  '[Conclusion] Get Conclusion By Project Empty'
);

export const updateConclusion = createAction(
  '[Conclusion] Update Conclusion',
  props<{ id: number; dto: UpdateConclusionDto }>()
);

export const updateConclusionSuccess = createAction(
  '[Conclusion] Update Conclusion Success',
  props<{ conclusion: Conclusion }>()
);

export const updateConclusionFailure = createAction(
  '[Conclusion] Update Conclusion Failure',
  props<{ error: string }>()
);

export const finalizeConclusion = createAction(
  '[Conclusion] Finalize Conclusion',
  props<{ id: number }>()
);

export const finalizeConclusionSuccess = createAction(
  '[Conclusion] Finalize Conclusion Success',
  props<{ conclusion: Conclusion }>()
);

export const finalizeConclusionFailure = createAction(
  '[Conclusion] Finalize Conclusion Failure',
  props<{ error: string }>()
);

// Ações para Arquivos
export const loadFiles = createAction(
  '[Conclusion] Load Files',
  props<{ projectId: number }>()
);

export const loadFilesSuccess = createAction(
  '[Conclusion] Load Files Success',
  props<{ files: UploadedFile[] }>()
);

export const loadFilesFailure = createAction(
  '[Conclusion] Load Files Failure',
  props<{ error: string }>()
);

export const uploadFile = createAction(
  '[Conclusion] Upload File',
  props<{
    file: File;
    userId: number;
    projectId: number;
  }>()
);

export const uploadFileSuccess = createAction(
  '[Conclusion] Upload File Success',
  props<{ file: UploadedFile }>()
);

export const uploadFileFailure = createAction(
  '[Conclusion] Upload File Failure',
  props<{ error: string }>()
);

export const deleteFile = createAction(
  '[Conclusion] Delete File',
  props<{ fileId: number; userId: number }>()
);

export const deleteFileSuccess = createAction(
  '[Conclusion] Delete File Success',
  props<{ fileId: number }>()
);

export const deleteFileFailure = createAction(
  '[Conclusion] Delete File Failure',
  props<{ error: string }>()
);
