import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  CreateIdeationIdeaDto,
  CreateIdeationPointDto,
  IdeationIdea,
  IdeationPoint,
  IdeationPointType,
} from '../../../../common/interfaces/ideation.interface';
import { IdeationFacade } from '../../../../stores/ideation-store/ideation.facade';
import { ConfirmationDialogComponent } from '../../../../common/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-ideation-step',
  templateUrl: './ideation-step.component.html',
  styleUrls: ['./ideation-step.component.scss', '../../project.component.scss'],
})
export class IdeationStepComponent implements OnInit, OnDestroy {
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
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.ideas$ = this.ideationFacade.ideas$;
    this.loading$ = this.ideationFacade.loading$;
    this.error$ = this.ideationFacade.error$;

    this.queryParamsSub = this.route.queryParams
      .pipe(filter((params) => params['userId'] && params['projectId']))
      .subscribe((params) => {
        this.currentUserId = +params['userId'];
        this.projectId = +params['projectId'];
        this.loadData();
      });
  }

  ngOnDestroy(): void {
    if (this.queryParamsSub) {
      this.queryParamsSub.unsubscribe();
    }
  }

  loadData(): void {
    if (this.projectId) {
      this.ideationFacade.loadIdeasByProject(this.projectId);
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

    this.ideationFacade.updateIdea(this.editingIdeaId, {
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
        this.ideationFacade.deleteIdea(idea.id);
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

  deletePoint(pointId: number): void {
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
        this.ideationFacade.deletePoint(pointId);
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
