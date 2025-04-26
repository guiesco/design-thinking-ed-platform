import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrototypeFacade } from '../../../../stores/prototype-store/prototype.facade';
import { UploadedFile } from '../../../../common/services/file-upload.service';
import { Prototype } from '../../../../stores/prototype-store/prototype.state';
import { Observable, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { UserFacade } from '../../../../stores/user-state-store/user.facade';
import { IUser } from '../../../../common/interfaces/user.interface';

@Component({
  selector: 'app-prototyping-step',
  templateUrl: './prototyping-step.component.html',
  styleUrls: ['./prototyping-step.component.scss'],
})
export class PrototypingStepComponent implements OnInit, OnDestroy {
  projectId: number = 0;
  currentUserId: number = 0;
  description: string = '';

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
  maxFileSize: number = 1024 * 1024; // 1MB
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
    private prototypeFacade: PrototypeFacade,
    private userFacade: UserFacade,
    private route: ActivatedRoute
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
    // Inicializar o usuário atual
    this.initializeUser();

    // Inicializar o ID do projeto
    this.initializeProjectId();

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
  }

  protected initializeUser(): void {
    this.userFacade.user$.pipe(take(1)).subscribe((user: IUser | null) => {
      if (user?.id) {
        this.currentUserId = Number(user.id);
      }
    });
  }

  protected initializeProjectId(): void {
    this.projectId = Number(this.route.parent?.snapshot.params['projectId']);
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

    this.prototype$.pipe(take(1)).subscribe((prototype) => {
      if (prototype) {
        // Atualizar protótipo existente
        this.prototypeFacade.updatePrototype(prototype.id, { description });
      } else {
        // Criar novo protótipo
        this.prototypeFacade.createPrototype({
          projectId: this.projectId,
          userId: this.currentUserId,
          description,
        });
      }
    });
  }

  onFilesChanged(files: File[]): void {
    // Upload de cada arquivo
    files.forEach((file) => {
      this.prototypeFacade.uploadFile(file, this.currentUserId, this.projectId);
    });
  }

  onFileRemoved(fileId: string | number): void {
    this.prototypeFacade.deleteFile(+fileId, this.currentUserId);
  }
}
