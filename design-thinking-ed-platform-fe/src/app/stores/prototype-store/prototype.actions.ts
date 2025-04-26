import { createAction, props } from '@ngrx/store';
import {
  Prototype,
  CreatePrototypeDto,
  UpdatePrototypeDto,
} from './prototype.state';
import { UploadedFile } from '../../common/services/file-upload.service';

// Ações para Protótipo
export const createPrototype = createAction(
  '[Prototype] Create Prototype',
  props<{ dto: CreatePrototypeDto }>()
);

export const createPrototypeSuccess = createAction(
  '[Prototype] Create Prototype Success',
  props<{ prototype: Prototype }>()
);

export const createPrototypeFailure = createAction(
  '[Prototype] Create Prototype Failure',
  props<{ error: string }>()
);

export const getPrototypeByProject = createAction(
  '[Prototype] Get Prototype By Project',
  props<{ projectId: number }>()
);

export const getPrototypeByProjectSuccess = createAction(
  '[Prototype] Get Prototype By Project Success',
  props<{ prototype: Prototype }>()
);

export const getPrototypeByProjectFailure = createAction(
  '[Prototype] Get Prototype By Project Failure',
  props<{ error: string }>()
);

export const getPrototypeByProjectEmpty = createAction(
  '[Prototype] Get Prototype By Project Empty'
);

export const updatePrototype = createAction(
  '[Prototype] Update Prototype',
  props<{ id: number; dto: UpdatePrototypeDto }>()
);

export const updatePrototypeSuccess = createAction(
  '[Prototype] Update Prototype Success',
  props<{ prototype: Prototype }>()
);

export const updatePrototypeFailure = createAction(
  '[Prototype] Update Prototype Failure',
  props<{ error: string }>()
);

// Ações para Arquivos
export const loadFiles = createAction(
  '[Prototype] Load Files',
  props<{ projectId: number }>()
);

export const loadFilesSuccess = createAction(
  '[Prototype] Load Files Success',
  props<{ files: UploadedFile[] }>()
);

export const loadFilesFailure = createAction(
  '[Prototype] Load Files Failure',
  props<{ error: string }>()
);

export const uploadFile = createAction(
  '[Prototype] Upload File',
  props<{
    file: File;
    userId: number;
    projectId: number;
  }>()
);

export const uploadFileSuccess = createAction(
  '[Prototype] Upload File Success',
  props<{ file: UploadedFile }>()
);

export const uploadFileFailure = createAction(
  '[Prototype] Upload File Failure',
  props<{ error: string }>()
);

export const deleteFile = createAction(
  '[Prototype] Delete File',
  props<{ fileId: number }>()
);

export const deleteFileSuccess = createAction(
  '[Prototype] Delete File Success',
  props<{ fileId: number }>()
);

export const deleteFileFailure = createAction(
  '[Prototype] Delete File Failure',
  props<{ error: string }>()
);
