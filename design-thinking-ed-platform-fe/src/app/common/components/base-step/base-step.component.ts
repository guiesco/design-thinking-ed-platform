import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, take } from 'rxjs/operators';
import { IUser } from '../../../common/interfaces/user.interface';
import { IResponseFormField } from '../response-form/response-form.component';
import { IResponse } from '../../../common/interfaces/response.interface';
import { UserFacade } from '../../../stores/user-state-store/user.facade';

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
    protected snackBar: MatSnackBar
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

  protected abstract loadResponses(): void;
  protected abstract getResponsesByType(type: any): Observable<IResponse[]>;
  protected abstract getTypeLabel(type: any): string;
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
