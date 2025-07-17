import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as ConclusionActions from './conclusion.actions';
import { ConclusionService } from './conclusion.service';
import {
  FileUploadService,
  FileStepType,
} from '../../common/services/file-upload.service';

@Injectable()
export class ConclusionEffects {
  constructor(
    private actions$: Actions,
    private conclusionService: ConclusionService,
    private fileService: FileUploadService
  ) {}

  createConclusion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConclusionActions.createConclusion),
      mergeMap(({ dto }) =>
        this.conclusionService.createConclusion(dto).pipe(
          map((conclusion) =>
            ConclusionActions.createConclusionSuccess({ conclusion })
          ),
          catchError((error) =>
            of(
              ConclusionActions.createConclusionFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  getConclusionByProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConclusionActions.getConclusionByProject),
      mergeMap(({ projectId }) =>
        this.conclusionService.getConclusionByProject(projectId).pipe(
          map((conclusion) =>
            ConclusionActions.getConclusionByProjectSuccess({ conclusion })
          ),
          catchError((error) => {
            if (error.status === 404) {
              return of(ConclusionActions.getConclusionByProjectEmpty());
            }
            return of(
              ConclusionActions.getConclusionByProjectFailure({
                error: error.message,
              })
            );
          })
        )
      )
    )
  );

  updateConclusion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConclusionActions.updateConclusion),
      mergeMap(({ id, dto }) =>
        this.conclusionService.updateConclusion(id, dto).pipe(
          map((conclusion) =>
            ConclusionActions.updateConclusionSuccess({ conclusion })
          ),
          catchError((error) =>
            of(
              ConclusionActions.updateConclusionFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  finalizeConclusion$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConclusionActions.finalizeConclusion),
      mergeMap(({ id }) =>
        this.conclusionService.finalizeConclusion(id).pipe(
          map((conclusion) =>
            ConclusionActions.finalizeConclusionSuccess({ conclusion })
          ),
          catchError((error) =>
            of(
              ConclusionActions.finalizeConclusionFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  // Efeitos para operações de arquivo
  loadFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConclusionActions.loadFiles),
      mergeMap(({ projectId }) =>
        this.fileService
          .getFilesByProject(projectId, FileStepType.CONCLUSION)
          .pipe(
            map((files) => {
              // Processar os arquivos para adicionar URLs de download
              const processedFiles =
                this.fileService.processReceivedFiles(files);
              return ConclusionActions.loadFilesSuccess({
                files: processedFiles,
              });
            }),
            catchError((error) =>
              of(ConclusionActions.loadFilesFailure({ error: error.message }))
            )
          )
      )
    )
  );

  uploadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConclusionActions.uploadFile),
      mergeMap(({ file, userId, projectId }) =>
        this.fileService
          .uploadFile(file, userId, projectId, FileStepType.CONCLUSION)
          .pipe(
            map((uploadedFile) => {
              // Garantir que o arquivo retornado tenha uma URL de download
              if (uploadedFile && uploadedFile.id) {
                uploadedFile.downloadUrl = this.fileService.getDownloadUrl(
                  uploadedFile.id
                );
              }
              return ConclusionActions.uploadFileSuccess({
                file: uploadedFile,
              });
            }),
            catchError((error) =>
              of(ConclusionActions.uploadFileFailure({ error: error.message }))
            )
          )
      )
    )
  );

  deleteFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConclusionActions.deleteFile),
      mergeMap(({ fileId, userId }) =>
        this.fileService.deleteFile(fileId, userId).pipe(
          map(() => ConclusionActions.deleteFileSuccess({ fileId })),
          catchError((error) =>
            of(ConclusionActions.deleteFileFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
