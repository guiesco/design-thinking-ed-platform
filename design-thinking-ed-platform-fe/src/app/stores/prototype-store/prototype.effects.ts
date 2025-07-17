import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { PrototypeService } from './prototype.service';
import {
  FileUploadService,
  FileStepType,
} from '../../common/services/file-upload.service';
import * as PrototypeActions from './prototype.actions';

@Injectable()
export class PrototypeEffects {
  constructor(
    private actions$: Actions,
    private prototypeService: PrototypeService,
    private fileUploadService: FileUploadService
  ) {}

  createPrototype$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrototypeActions.createPrototype),
      mergeMap(({ dto }) =>
        this.prototypeService.createPrototype(dto).pipe(
          map((prototype) =>
            PrototypeActions.createPrototypeSuccess({ prototype })
          ),
          catchError((error) =>
            of(
              PrototypeActions.createPrototypeFailure({ error: error.message })
            )
          )
        )
      )
    )
  );

  getPrototypeByProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrototypeActions.getPrototypeByProject),
      mergeMap(({ projectId }) =>
        this.prototypeService.getPrototypeByProject(projectId).pipe(
          map((prototype) =>
            PrototypeActions.getPrototypeByProjectSuccess({ prototype })
          ),
          catchError((error) => {
            if (error.status === 404) {
              return of(PrototypeActions.getPrototypeByProjectEmpty());
            }
            return of(
              PrototypeActions.getPrototypeByProjectFailure({
                error: error.message,
              })
            );
          })
        )
      )
    )
  );

  updatePrototype$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrototypeActions.updatePrototype),
      mergeMap(({ id, dto }) =>
        this.prototypeService.updatePrototype(id, dto).pipe(
          map((prototype) =>
            PrototypeActions.updatePrototypeSuccess({ prototype })
          ),
          catchError((error) =>
            of(
              PrototypeActions.updatePrototypeFailure({ error: error.message })
            )
          )
        )
      )
    )
  );

  finalizePrototype$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrototypeActions.finalizePrototype),
      mergeMap(({ id }) =>
        this.prototypeService.finalizePrototype(id).pipe(
          map((prototype) =>
            PrototypeActions.finalizePrototypeSuccess({ prototype })
          ),
          catchError((error) =>
            of(
              PrototypeActions.finalizePrototypeFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  loadFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrototypeActions.loadFiles),
      mergeMap(({ projectId }) =>
        this.fileUploadService
          .getFilesByProject(projectId, FileStepType.PROTOTYPE)
          .pipe(
            map((files) => {
              const processedFiles =
                this.fileUploadService.processReceivedFiles(files);
              return PrototypeActions.loadFilesSuccess({
                files: processedFiles,
              });
            }),
            catchError((error) =>
              of(PrototypeActions.loadFilesFailure({ error: error.message }))
            )
          )
      )
    )
  );

  uploadFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrototypeActions.uploadFile),
      mergeMap(({ file, userId, projectId }) =>
        this.fileUploadService
          .uploadFile(file, userId, projectId, FileStepType.PROTOTYPE)
          .pipe(
            map((uploadedFile) => {
              if (uploadedFile && uploadedFile.id) {
                uploadedFile.downloadUrl =
                  this.fileUploadService.getDownloadUrl(uploadedFile.id);
              }
              return PrototypeActions.uploadFileSuccess({ file: uploadedFile });
            }),
            catchError((error) =>
              of(PrototypeActions.uploadFileFailure({ error: error.message }))
            )
          )
      )
    )
  );

  deleteFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PrototypeActions.deleteFile),
      mergeMap(({ fileId, userId }) =>
        this.fileUploadService.deleteFile(fileId, userId).pipe(
          map(() => PrototypeActions.deleteFileSuccess({ fileId })),
          catchError((error) =>
            of(PrototypeActions.deleteFileFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
