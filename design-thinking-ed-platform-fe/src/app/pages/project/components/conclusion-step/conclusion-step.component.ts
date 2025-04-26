import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConclusionFacade } from '../../../../stores/conclusion-store/conclusion.facade';
import { UploadedFile } from '../../../../common/services/file-upload.service';
import { Conclusion } from '../../../../stores/conclusion-store/conclusion.state';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-conclusion-step',
  templateUrl: './conclusion-step.component.html',
  styleUrls: ['./conclusion-step.component.scss'],
})
export class ConclusionStepComponent implements OnInit, OnDestroy {
  @Input() projectId: number = 0;
  @Input() userId: number = 0;
  @Input() description: string = '';

  conclusionForm: FormGroup;
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

  conclusion$: Observable<Conclusion | null>;
  files$: Observable<UploadedFile[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  isConclusionCreated$: Observable<boolean>;

  protected destroyed$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private conclusionFacade: ConclusionFacade
  ) {
    this.conclusionForm = this.fb.group({
      description: ['', Validators.required],
    });

    this.conclusion$ = this.conclusionFacade.conclusion$;
    this.files$ = this.conclusionFacade.files$;
    this.loading$ = this.conclusionFacade.loading$;
    this.error$ = this.conclusionFacade.error$;
    this.isConclusionCreated$ = this.conclusion$.pipe(
      map((conclusion) => !!conclusion)
    );
  }

  ngOnInit(): void {
    // Carregar conclusão existente
    this.conclusionFacade.getConclusionByProject(this.projectId);

    // Carregar arquivos
    this.conclusionFacade.loadFiles(this.projectId);

    // Assinar mudanças na conclusão
    this.conclusion$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((conclusion) => {
        if (conclusion) {
          this.conclusionForm.patchValue({
            description: conclusion.description,
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
      this.conclusionForm.patchValue({ description: this.description });
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSubmit(): void {
    if (this.conclusionForm.invalid) {
      return;
    }

    const description = this.conclusionForm.value.description;

    this.conclusion$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((conclusion) => {
        if (conclusion) {
          // Atualizar conclusão existente
          this.conclusionFacade.updateConclusion(conclusion.id, {
            description,
          });
        } else {
          // Criar nova conclusão
          this.conclusionFacade.createConclusion({
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
      this.conclusionFacade.uploadFile(file, this.userId, this.projectId);
    });
  }

  onFileRemoved(fileId: string | number): void {
    this.conclusionFacade.deleteFile(+fileId);
  }
}
