import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { map, take } from 'rxjs/operators';
import { IUser } from '../../../common/interfaces/user.interface';
import { IResponseFormField } from '../response-form/response-form.component';
import { IResponse } from '../../../common/interfaces/response.interface';
import { UserFacade } from '../../../stores/user-state-store/user.facade';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  template: '',
})
export abstract class BaseStepComponent implements OnInit {
  protected projectId!: number;
  protected currentUserId!: number;
  protected displayedColumns = ['select', 'content', 'actions'];
  protected formFields: IResponseFormField[] = [];

  constructor(
    protected userFacade: UserFacade,
    protected route: ActivatedRoute,
    protected snackBar: MatSnackBar,
    protected dialog?: MatDialog
  ) {}

  ngOnInit(): void {
    this.initializeUser();
    this.initializeProjectId();
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

  protected isCurrentUser$ = (userId: number): Observable<boolean> =>
    this.userFacade.user$.pipe(
      map((user: IUser | null) => user?.id === userId)
    );

  protected showError(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  protected showSuccess(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

  protected validateSelections(types: any[]): boolean {
    const missingSelections: any[] = [];

    // Verificar cada tipo para garantir que pelo menos uma resposta está selecionada
    for (const type of types) {
      let hasSelected = false;
      this.getSelectedResponsesByType(type).subscribe((responses) => {
        if (responses.length > 0) {
          hasSelected = true;
        }
      });

      if (!hasSelected) {
        missingSelections.push(type);
      }
    }

    if (missingSelections.length > 0) {
      const missingLabels = missingSelections
        .map((type) => this.getTypeLabel(type))
        .join(', ');
      this.showError(
        `Por favor, selecione pelo menos uma resposta em cada seção: ${missingLabels}`
      );
      return false;
    }

    return true;
  }

  protected openConfirmationDialog(entity: any): Observable<boolean> {
    if (!this.dialog) {
      console.error('MatDialog is not injected');
      return of(true);
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmar submissão',
        message: 'Você tem certeza que deseja submeter estas respostas?',
        entity: entity,
      },
    });

    return dialogRef.afterClosed();
  }

  protected submitResponses(types: any[]): void {
    if (!this.validateSelections(types)) {
      return;
    }

    const entity = this.prepareEntity();

    this.openConfirmationDialog(entity).subscribe((confirmed) => {
      if (confirmed) {
        this.createEntity(entity);
      }
    });
  }

  protected abstract loadResponses(): void;
  protected abstract getResponsesByType(type: any): Observable<IResponse[]>;
  protected abstract getSelectedResponsesByType(
    type: any
  ): Observable<IResponse[]>;
  protected abstract getTypeLabel(type: any): string;
  protected abstract prepareEntity(): any;
  protected abstract createEntity(entity: any): void;
  protected abstract onSubmit(type: any, formData: any): void;
  protected abstract onUpvote(event: {
    responseId: number;
    hasVoted: boolean;
  }): void;
  protected abstract onToggleSelection(responseId: number): void;
  protected abstract onDelete(responseId: number): void;
  protected abstract onEdit(response: IResponse): void;
  protected abstract onSaveEdit(event: { id: number; content: string }): void;
  protected abstract refreshData(): void;
}
