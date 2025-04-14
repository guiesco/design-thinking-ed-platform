import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ChallengeDefinitionResponse,
  ResponseType,
} from '../../../../common/interfaces/challenge-definition-response.interface';
import { ChallengeDefinitionFacade } from '../../../../stores/challenge-definition-store/challenge-definition.facade';
import { UserFacade } from '../../../../stores/user-state-store/user.facade';
import { IUser } from '../../../../common/interfaces/user.interface';
import { IResponseFormField } from '../../../../common/components/response-form/response-form.component';
import { IResponse } from '../../../../common/interfaces/response.interface';
import { map, take } from 'rxjs/operators';
import * as ChallengeDefinitionActions from '../../../../stores/challenge-definition-store/challenge-definition.actions';
import * as ChallengeDefinitionSelectors from '../../../../stores/challenge-definition-store/challenge-definition.selectors';

@Component({
  selector: 'app-challenge-definition-step',
  templateUrl: './challenge-definition-step.component.html',
  styleUrls: ['./challenge-definition-step.component.scss'],
})
export class ChallengeDefinitionStepComponent implements OnInit {
  projectId!: number;
  currentUserId!: number;
  currentStep: number = 1;
  showBrainstormStep: boolean = false;

  ResponseType = ResponseType;
  responseTypes = Object.values(ResponseType);

  // Para agrupar os tipos de resposta por etapa
  firstStepResponseTypes = [
    ResponseType.PROBLEMS,
    ResponseType.TARGET_AUDIENCE,
    ResponseType.HOW_WE_CAN,
  ];
  secondStepResponseTypes = [ResponseType.BRAINSTORM];

  responses$: Observable<IResponse[]> = this.store.select(
    ChallengeDefinitionSelectors.selectResponses
  );
  loading$: Observable<boolean> = this.store.select(
    ChallengeDefinitionSelectors.selectLoading
  );
  error$: Observable<string | null> = this.store.select(
    ChallengeDefinitionSelectors.selectError
  );

  isCurrentUser$ = (userId: number): Observable<boolean> =>
    this.userFacade.user$.pipe(map((user) => user?.id === userId));

  displayedColumns = ['content', 'actions'];

  formFields: IResponseFormField[] = [
    {
      key: 'content',
      label: 'Resposta',
      placeholder: 'Digite sua resposta...',
      required: true,
    },
  ];

  constructor(
    private store: Store,
    private userFacade: UserFacade,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userFacade.user$.pipe(take(1)).subscribe((user) => {
      if (user?.id) {
        this.currentUserId = Number(user.id);
      }
    });

    this.error$.subscribe((error) => {
      if (error) {
        this.snackBar.open(`Erro ao carregar respostas: ${error}`, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    });

    const projectId = Number(this.route.parent?.snapshot.params['projectId']);
    this.store.dispatch(
      ChallengeDefinitionActions.loadResponses({ projectId })
    );
  }

  getResponsesByType(type: ResponseType): Observable<IResponse[]> {
    return this.responses$.pipe(
      map((responses) => responses.filter((response) => response.type === type))
    );
  }

  getTypeLabel(type: ResponseType): string {
    const labels: Record<ResponseType, string> = {
      [ResponseType.PROBLEMS]: 'Problemas',
      [ResponseType.TARGET_AUDIENCE]: 'Público-Alvo',
      [ResponseType.HOW_WE_CAN]: 'Como Podemos',
      [ResponseType.BRAINSTORM]: 'Brainstorm',
    };
    return labels[type];
  }

  onSubmit(type: ResponseType, formData: any): void {
    if (!this.currentUserId) {
      this.snackBar.open('Usuário não identificado', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      return;
    }

    const projectId = Number(this.route.snapshot.params['id']);
    this.store.dispatch(
      ChallengeDefinitionActions.createResponse({
        responseType: type,
        content: formData.content,
        userId: this.currentUserId,
        projectId,
      })
    );
  }

  onUpvote(event: { responseId: number; hasVoted: boolean }): void {
    if (!this.currentUserId) return;

    if (event.hasVoted) {
      this.store.dispatch(
        ChallengeDefinitionActions.removeVote({
          id: event.responseId,
          userId: this.currentUserId,
        })
      );
    } else {
      this.store.dispatch(
        ChallengeDefinitionActions.upvoteResponse({
          id: event.responseId,
          userId: this.currentUserId,
        })
      );
    }
  }

  onToggleSelection(responseId: number): void {
    if (!this.currentUserId) return;
    this.store.dispatch(
      ChallengeDefinitionActions.toggleResponseSelection({
        id: responseId,
        userId: this.currentUserId,
      })
    );
  }

  onDelete(responseId: number): void {
    if (!this.currentUserId) return;
    this.store.dispatch(
      ChallengeDefinitionActions.deleteResponse({
        id: responseId,
        userId: this.currentUserId,
      })
    );
  }

  onEdit(response: IResponse): void {
    if (!this.currentUserId) return;
    this.store.dispatch(
      ChallengeDefinitionActions.updateResponse({
        id: response.id,
        content: response.content,
        userId: this.currentUserId,
      })
    );
  }

  onSaveEdit(event: { id: number; content: string }): void {
    if (!this.currentUserId) return;
    this.store.dispatch(
      ChallengeDefinitionActions.updateResponse({
        id: event.id,
        content: event.content,
        userId: this.currentUserId,
      })
    );
  }

  refreshData(): void {
    const projectId = Number(this.route.snapshot.params['id']);
    this.store.dispatch(
      ChallengeDefinitionActions.loadResponses({ projectId })
    );
  }

  goToBrainstorm(): void {
    this.showBrainstormStep = true;
  }

  goBackToDefinition(): void {
    this.showBrainstormStep = false;
  }

  onFinalSubmit(): void {
    // Implementar lógica de finalização
  }
}
