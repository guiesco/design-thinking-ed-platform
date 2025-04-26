import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import {
  CreateIdeationIdeaDto,
  CreateIdeationPointDto,
  IdeationIdea,
  IdeationPoint,
  IdeationPointType,
} from '../../../../common/interfaces/ideation.interface';
import { IdeationFacade } from '../../../../stores/ideation-store/ideation.facade';
import { ConfirmationDialogComponent } from '../../../../common/components/confirmation-dialog/confirmation-dialog.component';
import { IUser } from 'src/app/common/interfaces/user.interface';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';
@Component({
  selector: 'app-ideation-step',
  templateUrl: './ideation-step.component.html',
  styleUrls: ['./ideation-step.component.scss', '../../project.component.scss'],
})
export class IdeationStepComponent implements OnInit, OnDestroy {
  pointType = IdeationPointType;
  projectId!: number;
  currentUserId!: number;
  ideas$!: Observable<IdeationIdea[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;

  private queryParamsSub!: Subscription;
  newIdeaTitle: string = '';
  editingIdeaId: number | null = null;
  editingIdeaTitle: string = '';

  constructor(
    private route: ActivatedRoute,
    private ideationFacade: IdeationFacade,
    private userFacade: UserFacade,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.ideas$ = this.ideationFacade.ideas$;
    this.loading$ = this.ideationFacade.loading$;
    this.error$ = this.ideationFacade.error$;
    this.userFacade.user$.pipe(take(1)).subscribe((user: IUser | null) => {
      if (user?.id) {
        this.currentUserId = Number(user.id);
      }
    });

    this.route.parent?.params.subscribe((params) => {
      this.projectId = +params['projectId'];
      this.loadData();
    });
  }

  getIdeaPoints(
    points: IdeationPoint[],
    type: IdeationPointType
  ): IdeationPoint[] {
    return points?.filter((point) => point.type === type) || [];
  }

  ngOnDestroy(): void {
    if (this.queryParamsSub) {
      this.queryParamsSub.unsubscribe();
    }
  }

  loadData(): void {
    if (this.projectId) {
      this.ideationFacade.loadIdeasByProject(
        this.projectId,
        this.currentUserId
      );
    }
  }

  createIdea(): void {
    if (!this.newIdeaTitle.trim()) {
      this.showError('O título da ideia não pode estar vazio');
      return;
    }

    const idea: CreateIdeationIdeaDto = {
      title: this.newIdeaTitle,
      projectId: this.projectId,
      userId: this.currentUserId,
    };
    console.log('🚀 ~ IdeationStepComponent ~ createIdea ~ idea:', idea);

    this.ideationFacade.createIdea(idea);
    this.newIdeaTitle = '';
  }

  startEditingIdea(idea: IdeationIdea): void {
    this.editingIdeaId = idea.id;
    this.editingIdeaTitle = idea.title;
  }

  saveEditIdea(): void {
    if (!this.editingIdeaTitle.trim() || !this.editingIdeaId) {
      this.showError('O título da ideia não pode estar vazio');
      return;
    }

    this.ideationFacade.updateIdea(this.editingIdeaId, this.currentUserId, {
      title: this.editingIdeaTitle,
    });
    this.cancelEditIdea();
  }

  cancelEditIdea(): void {
    this.editingIdeaId = null;
    this.editingIdeaTitle = '';
  }

  confirmDeleteIdea(idea: IdeationIdea): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmar exclusão',
        message: `Tem certeza que deseja excluir a ideia "${idea.title}"? Esta ação não pode ser desfeita.`,
        entity: idea,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ideationFacade.deleteIdea(idea.id, this.currentUserId);
      }
    });
  }

  upvoteIdea(idea: IdeationIdea): void {
    this.ideationFacade.upvoteIdea(idea.id, this.currentUserId);
  }

  addPoint(ideaId: number, content: string, type: IdeationPointType): void {
    if (!content.trim()) {
      this.showError('O conteúdo não pode estar vazio');
      return;
    }

    const point: CreateIdeationPointDto = {
      content,
      type,
      ideaId,
      userId: this.currentUserId,
    };

    this.ideationFacade.createPoint(point);
  }

  deletePoint(event: { pointId: number; ideaId: number }): void {
    const { pointId, ideaId } = event;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmar exclusão',
        message:
          'Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.',
        entity: { id: pointId },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ideationFacade.deletePoint(pointId, this.currentUserId, ideaId);
      }
    });
  }

  upvotePoint(pointId: number): void {
    this.ideationFacade.upvotePoint(pointId, this.currentUserId);
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar'],
    });
  }
}
