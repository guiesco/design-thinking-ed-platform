import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {
  ChallengeDefinitionResponse,
  ResponseType,
} from '../../../../common/interfaces/challenge-definition-response.interface';
import { ChallengeDefinitionFacade } from '../../../../stores/challenge-definition-store/challenge-definition.facade';
import { UserFacade } from '../../../../stores/user-state-store/user.facade';
import { IResponseFormField } from '../../../../common/components/response-form/response-form.component';
import { IResponse } from '../../../../common/interfaces/response.interface';
import { CreateChallengeDefinitionResponseDto } from '../../../../common/interfaces/create-challenge-definition-response.interface';
import { BaseStepComponent } from '../../../../common/components/base-step/base-step.component';

@Component({
  selector: 'app-challenge-definition-step',
  templateUrl: './challenge-definition-step.component.html',
  styleUrls: ['./challenge-definition-step.component.scss'],
})
export class ChallengeDefinitionStepComponent extends BaseStepComponent {
  currentStep: number = 1;
  showBrainstormStep: boolean = false;

  ResponseType = ResponseType;
  responseTypes = Object.values(ResponseType);

  firstStepResponseTypes = [
    ResponseType.PROBLEMS,
    ResponseType.TARGET_AUDIENCE,
    ResponseType.HOW_WE_CAN,
  ];
  secondStepResponseTypes = [ResponseType.BRAINSTORM];

  responses$: Observable<IResponse[]> =
    this.challengeDefinitionFacade.responses$;
  loading$: Observable<boolean> = this.challengeDefinitionFacade.loading$;
  error$: Observable<string | null> = this.challengeDefinitionFacade.error$;

  override formFields: IResponseFormField[] = [
    {
      key: 'content',
      label: 'Resposta',
      placeholder: 'Digite sua resposta...',
      required: true,
    },
  ];

  constructor(
    private challengeDefinitionFacade: ChallengeDefinitionFacade,
    userFacade: UserFacade,
    route: ActivatedRoute,
    snackBar: MatSnackBar
  ) {
    super(userFacade, route, snackBar);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadResponses();
    this.error$.subscribe((error) => {
      if (error) {
        this.showError(`Erro ao carregar respostas: ${error}`);
      }
    });
  }

  loadResponses(): void {
    if (this.projectId && this.currentUserId) {
      this.challengeDefinitionFacade.loadResponses(
        this.projectId,
        this.currentUserId
      );
    }
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
    if (!this.currentUserId || !this.projectId) {
      this.showError('Usuário ou projeto não identificado');
      return;
    }

    const content = formData.content;
    if (!content.trim()) return;

    const lines = content.split('\n').filter((line: string) => line.trim());
    const responses: CreateChallengeDefinitionResponseDto[] = [];

    lines.forEach((line: string) => {
      responses.push({
        type: type,
        content: line.trim(),
        userId: this.currentUserId,
        projectId: this.projectId,
      });
    });

    if (responses.length > 0) {
      this.challengeDefinitionFacade.createResponses(responses);
      this.showSuccess(
        `${responses.length} resposta(s) criada(s) com sucesso!`
      );
    }
  }

  onUpvote(event: { responseId: number; hasVoted: boolean }): void {
    if (!this.currentUserId) return;

    if (event.hasVoted) {
      this.challengeDefinitionFacade.removeVote(
        event.responseId,
        this.currentUserId
      );
    } else {
      this.challengeDefinitionFacade.upvoteResponse(
        event.responseId,
        this.currentUserId
      );
    }
  }

  onToggleSelection(responseId: number): void {
    if (!this.currentUserId) return;
    this.challengeDefinitionFacade.toggleResponseSelection(
      responseId,
      this.currentUserId
    );
  }

  onDelete(responseId: number): void {
    if (!this.currentUserId) return;
    this.challengeDefinitionFacade.deleteResponse(
      responseId,
      this.currentUserId
    );
  }

  onEdit(response: IResponse): void {
    if (!this.currentUserId) return;
    this.challengeDefinitionFacade.updateResponse(
      response.id,
      response.content,
      this.currentUserId
    );
  }

  onSaveEdit(event: { id: number; content: string }): void {
    if (!this.currentUserId) return;
    this.challengeDefinitionFacade.updateResponse(
      event.id,
      event.content,
      this.currentUserId
    );
  }

  refreshData(): void {
    if (this.projectId && this.currentUserId) {
      this.challengeDefinitionFacade.loadResponses(
        this.projectId,
        this.currentUserId
      );
      this.showSuccess('Dados atualizados com sucesso!');
    }
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
