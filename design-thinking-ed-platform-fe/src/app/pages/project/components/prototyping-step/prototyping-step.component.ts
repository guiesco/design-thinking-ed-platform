import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrototypeFacade } from '../../../../stores/prototype-store/prototype.facade';
import { UploadedFile } from '../../../../common/services/file-upload.service';
import { Prototype } from '../../../../stores/prototype-store/prototype.state';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-prototyping-step',
  templateUrl: './prototyping-step.component.html',
  styleUrls: ['./prototyping-step.component.scss'],
})
export class PrototypingStepComponent implements OnInit, OnDestroy {
  @Input() projectId: number = 0;
  @Input() userId: number = 0;
  @Input() description: string = '';

  prototypeForm: FormGroup;
  files: UploadedFile[] = [];
  allowedFileTypes: string[] = [
    '.pdf',
    '.doc',
    '.docx',
    '.jpg',
    '.jpeg',
    '.png',
  ];
  maxFileSize: number = 10 * 1024 * 1024; // 10MB
  maxFileCount: number = 5;

  prototype$: Observable<Prototype | null>;
  files$: Observable<UploadedFile[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  isPrototypeCreated$: Observable<boolean>;

  protected destroyed$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private prototypeFacade: PrototypeFacade
  ) {
    this.prototypeForm = this.fb.group({
      description: ['', Validators.required],
    });

    this.prototype$ = this.prototypeFacade.prototype$;
    this.files$ = this.prototypeFacade.files$;
    this.loading$ = this.prototypeFacade.loading$;
    this.error$ = this.prototypeFacade.error$;
    this.isPrototypeCreated$ = this.prototypeFacade.isPrototypeCreated$;
  }

  ngOnInit(): void {
    // Carregar protótipo existente
    this.prototypeFacade.getPrototypeByProject(this.projectId);

    // Carregar arquivos
    this.prototypeFacade.loadFiles(this.projectId);

    // Assinar mudanças no protótipo
    this.prototype$.pipe(takeUntil(this.destroyed$)).subscribe((prototype) => {
      if (prototype) {
        this.prototypeForm.patchValue({
          description: prototype.description,
        });
      }
    });

    // Assinar mudanças nos arquivos
    this.files$.pipe(takeUntil(this.destroyed$)).subscribe((files) => {
      this.files = files;
    });

    // Assinar erros
    this.error$.pipe(takeUntil(this.destroyed$)).subscribe((error) => {
      if (error) {
        this.snackBar.open(`Erro: ${error}`, 'Fechar', {
          duration: 5000,
        });
      }
    });

    // Preencher descrição se fornecida
    if (this.description) {
      this.prototypeForm.patchValue({ description: this.description });
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSubmit(): void {
    if (this.prototypeForm.invalid) {
      return;
    }

    const description = this.prototypeForm.value.description;

    this.prototype$.pipe(takeUntil(this.destroyed$)).subscribe((prototype) => {
      if (prototype) {
        // Atualizar protótipo existente
        this.prototypeFacade.updatePrototype(prototype.id, { description });
      } else {
        // Criar novo protótipo
        this.prototypeFacade.createPrototype({
          projectId: this.projectId,
          userId: this.userId,
          description,
        });
      }
    });
  }

  onFilesChanged(files: File[]): void {
    // Upload de cada arquivo
    files.forEach((file) => {
      this.prototypeFacade.uploadFile(file, this.userId, this.projectId);
    });
  }

  onFileRemoved(fileId: string | number): void {
    this.prototypeFacade.deleteFile(+fileId);
  }
}
