import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit, OnChanges {
  @Input() allowedFileTypes: string[] = []; // Ex: ['.pdf', '.docx', '.jpg']
  @Input() maxFileSize: number = 5 * 1024 * 1024; // 5MB default
  @Input() maxFileCount: number = 5;
  @Input() existingFiles: any[] = [];

  @Output() filesChanged = new EventEmitter<File[]>();
  @Output() fileRemoved = new EventEmitter<string | number>();

  files: File[] = [];
  isDragging = false;
  uploadProgress: { [key: string]: number } = {};

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // Quando novos arquivos são recebidos via existingFiles, reseta os arquivos locais
    if (changes['existingFiles'] && !changes['existingFiles'].firstChange) {
      // Limpar arquivos locais após uploads bem-sucedidos
      this.resetLocalFiles();
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files) {
      this.handleFiles(element.files);
      // Reset the input so the same file can be selected again
      element.value = '';
    }
  }

  handleFiles(fileList: FileList): void {
    if (this.files.length + fileList.length > this.maxFileCount) {
      this.snackBar.open(
        `Você pode enviar no máximo ${this.maxFileCount} arquivos.`,
        'Fechar',
        {
          duration: 3000,
        }
      );
      return;
    }

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];

      // Verificar tamanho do arquivo
      if (file.size > this.maxFileSize) {
        this.snackBar.open(
          `Arquivo ${file.name} excede o tamanho máximo permitido.`,
          'Fechar',
          {
            duration: 3000,
          }
        );
        continue;
      }

      // Verificar tipo de arquivo se allowedFileTypes não estiver vazio
      if (this.allowedFileTypes.length > 0) {
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
        if (!this.allowedFileTypes.includes(fileExtension)) {
          this.snackBar.open(
            `Tipo de arquivo não permitido. Use: ${this.allowedFileTypes.join(
              ', '
            )}`,
            'Fechar',
            {
              duration: 3000,
            }
          );
          continue;
        }
      }

      this.files.push(file);
      this.uploadProgress[file.name] = 0; // Inicializa o progresso
    }

    // Iniciar upload se arquivos foram adicionados
    if (this.files.length > 0) {
      this.filesChanged.emit(this.files);
    }
  }

  removeFile(index: number): void {
    if (index >= 0 && index < this.files.length) {
      const file = this.files[index];
      this.files.splice(index, 1);
      delete this.uploadProgress[file.name];

      // Emitir a lista atualizada de arquivos
      this.filesChanged.emit(this.files);
    }
  }

  removeExistingFile(id: string | number, index: number): void {
    if (index >= 0 && index < this.existingFiles.length) {
      // Criar uma cópia do array antes de modificá-lo para evitar erro de propriedade readonly
      const updatedFiles = [...this.existingFiles];
      updatedFiles.splice(index, 1);

      // Atualizar a propriedade local
      this.existingFiles = updatedFiles;

      // Emitir evento para o componente pai lidar com a remoção no backend
      this.fileRemoved.emit(id);
    }
  }

  // Método para atualizar o progresso de upload (chamado pelo serviço de upload)
  updateProgress(fileName: string, progress: number): void {
    if (fileName && progress !== undefined) {
      this.uploadProgress[fileName] = progress;

      // Aplica a atualização de forma segura
      setTimeout(() => {
        // Se o progresso for 100%, aguarde um pouco antes de remover para dar feedback visual
        if (progress >= 100) {
          setTimeout(() => {
            delete this.uploadProgress[fileName];
          }, 1000);
        }
      }, 0);
    }
  }

  // Limpa todos os arquivos locais após o upload bem-sucedido
  resetLocalFiles(): void {
    this.files = [];
    this.uploadProgress = {};
  }

  formatFileSize(size: number): string {
    if (size < 1024) {
      return size + ' B';
    } else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(1) + ' KB';
    } else {
      return (size / (1024 * 1024)).toFixed(1) + ' MB';
    }
  }
}
