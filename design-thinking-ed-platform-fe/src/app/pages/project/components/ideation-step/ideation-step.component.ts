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
  private ideaSubscription!: Subscription;

  newIdeaTitle: string = '';
  editingIdeaId: number | null = null;
  editingIdeaTitle: string = '';

  // Controle de feedback visual
  lastAddedIdeaId: number | null = null;
  lastUpdatedIdeaId: number | null = null;
  lastUpvotedIdeaId: number | null = null;
  lastUpvotedPointId: number | null = null;

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

    // Observar erros para mostrar feedback
    this.ideaSubscription = this.ideationFacade.error$.subscribe((error) => {
      if (error) {
        this.showError(
          error.message || 'Ocorreu um erro na operação. Tente novamente.'
        );
      }
    });

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

    if (this.ideaSubscription) {
      this.ideaSubscription.unsubscribe();
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

    this.ideationFacade.createIdea(idea);

    // Feedback visual - mostrar ideia adicionada com destaque
    this.subscribeToNewIdea();

    this.newIdeaTitle = '';
    this.showSuccess('Ideia criada com sucesso!');
  }

  private subscribeToNewIdea(): void {
    // Inscrever-se para pegar o ID da ideia recém-criada para destacar
    const sub = this.ideationFacade.ideas$.subscribe((ideas) => {
      if (ideas && ideas.length > 0) {
        // Pegar a ideia mais recente (provavelmente a que acabou de ser criada)
        const latestIdea = ideas.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0];

        this.lastAddedIdeaId = latestIdea.id;

        // Limpar o feedback visual após alguns segundos
        setTimeout(() => {
          this.lastAddedIdeaId = null;
        }, 3000);

        // Limpar a inscrição
        sub.unsubscribe();
      }
    });
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

    // Guardar o ID da ideia atualizada para destacar
    this.lastUpdatedIdeaId = this.editingIdeaId;

    // Limpar o feedback visual após alguns segundos
    setTimeout(() => {
      this.lastUpdatedIdeaId = null;
    }, 3000);

    this.cancelEditIdea();
    this.showSuccess('Ideia atualizada com sucesso!');
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
        this.showSuccess('Ideia excluída com sucesso!');
      }
    });
  }

  upvoteIdea(idea: IdeationIdea): void {
    this.ideationFacade.upvoteIdea(idea.id, this.currentUserId);

    // Guardar o ID da ideia com upvote para feedback visual
    this.lastUpvotedIdeaId = idea.id;

    // Limpar o feedback visual após alguns segundos
    setTimeout(() => {
      this.lastUpvotedIdeaId = null;
    }, 1500);

    this.showSuccess(idea.hasVoted ? 'Voto removido!' : 'Voto adicionado!');
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
    this.showSuccess(
      type === IdeationPointType.PRO
        ? 'Ponto positivo adicionado!'
        : 'Ponto negativo adicionado!'
    );
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
        this.showSuccess('Item excluído com sucesso!');
      }
    });
  }

  upvotePoint(pointId: number): void {
    this.ideationFacade.upvotePoint(pointId, this.currentUserId);

    // Guardar o ID do ponto com upvote para feedback visual
    this.lastUpvotedPointId = pointId;

    // Limpar o feedback visual após alguns segundos
    setTimeout(() => {
      this.lastUpvotedPointId = null;
    }, 1500);

    this.showSuccess('Voto registrado!');
  }

  // Verificar se uma ideia deve ser destacada
  shouldHighlightIdea(ideaId: number): boolean {
    return (
      this.lastAddedIdeaId === ideaId ||
      this.lastUpdatedIdeaId === ideaId ||
      this.lastUpvotedIdeaId === ideaId
    );
  }

  // Verificar se um ponto deve ser destacado
  shouldHighlightPoint(pointId: number): boolean {
    return this.lastUpvotedPointId === pointId;
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar'],
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar'],
    });
  }
}
