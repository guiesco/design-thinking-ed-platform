import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface UploadedFile {
  id: number;
  originalName: string;
  size: number;
  mimeType: string;
  uploadDate: Date;
  userId: number;
  downloadUrl: string;
}

export enum FileStepType {
  PROTOTYPE = 'PROTOTYPE',
  CONCLUSION = 'CONCLUSION',
}

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private baseUrl = environment.apiUrl + '/files';

  constructor(private http: HttpClient) {}

  /**
   * Realiza o upload de um arquivo com monitoramento de progresso
   * @param file O arquivo a ser enviado
   * @param userId ID do usuário
   * @param projectId ID do projeto
   * @param stepType Tipo da etapa (PROTOTYPE ou CONCLUSION)
   * @param progressCallback Função para atualização do progresso
   */
  uploadFile(
    file: File,
    userId: number,
    projectId: number,
    stepType: FileStepType,
    progressCallback?: (fileName: string, progress: number) => void
  ): Observable<UploadedFile> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId.toString());
    formData.append('projectId', projectId.toString());
    formData.append('stepType', stepType);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
    });

    return this.http.request(req).pipe(
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const progress = Math.round(
              (100 * event.loaded) / (event.total || 1)
            );
            if (progressCallback) {
              progressCallback(file.name, progress);
            }
            return null;

          case HttpEventType.Response:
            return event.body as UploadedFile;

          default:
            return null;
        }
      })
    ) as Observable<UploadedFile>;
  }

  /**
   * Obtém arquivos por projeto e tipo de etapa
   * @param projectId ID do projeto
   * @param stepType Tipo da etapa (PROTOTYPE ou CONCLUSION)
   */
  getFilesByProject(
    projectId: number,
    stepType: FileStepType
  ): Observable<UploadedFile[]> {
    return this.http.get<UploadedFile[]>(
      `${this.baseUrl}/project/${projectId}?stepType=${stepType}`
    );
  }

  /**
   * Remove um arquivo pelo ID
   * @param fileId ID do arquivo
   */
  deleteFile(fileId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${fileId}`);
  }

  /**
   * Obtém a URL para download de um arquivo
   * @param fileId ID do arquivo
   */
  getDownloadUrl(fileId: number): string {
    return `${this.baseUrl}/${fileId}/download`;
  }
}
