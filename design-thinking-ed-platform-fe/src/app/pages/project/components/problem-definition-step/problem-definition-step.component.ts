import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProblemDefinitionFacade } from '../../../../stores/problem-definition-store/problem-definition.facade';
import { UserFacade } from '../../../../stores/user-state-store/user.facade';
import { ProblemDefinitionResponse } from '../../../../common/interfaces/problem-definition-response.interface';
import { ProblemDefinitionQuadrant } from '../../../../common/enum/problem-definition-quadrant.enum';
import { IResponseFormField } from '../../../../common/components/response-form/response-form.component';
import { BaseStepComponent } from '../../../../common/components/base-step/base-step.component';
import { IResponse } from '../../../../common/interfaces/response.interface';

@Component({
  selector: 'app-problem-definition-step',
  templateUrl: './problem-definition-step.component.html',
  styleUrls: [
    './problem-definition-step.component.scss',
    '../../project.component.scss',
  ],
})
export class ProblemDefinitionStepComponent
  extends BaseStepComponent
  implements OnInit
{
  responses$: Observable<ProblemDefinitionResponse[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  problemDefinition$: Observable<any>;
  hasProblemDefinition$: Observable<boolean>;
  quadrants = Object.values(ProblemDefinitionQuadrant);

  override formFields: IResponseFormField[] = [
    {
      key: 'main_question',
      label: 'Qual é a questão principal e por que ela é importante?',
      placeholder: 'Descreva a questão principal e sua importância',
      required: false,
    },
    {
      key: 'target_audience',
      label: 'Para quem isso é um problema?',
      placeholder: 'Identifique quem é afetado pelo problema',
      required: false,
    },
    {
      key: 'consequences',
      label: 'Quais as consequências desse problema mais afetam as pessoas?',
      placeholder: 'Descreva as principais consequências',
      required: false,
    },
    {
      key: 'alternative_view',
      label: 'Você consegue pensar esse problema de forma diferente?',
      placeholder: 'Apresente uma visão alternativa do problema',
      required: false,
    },
    {
      key: 'social_factors',
      label: 'Que fatores sociais e culturais têm influência neste problema?',
      placeholder: 'Descreva os fatores sociais e culturais relevantes',
      required: false,
    },
    {
      key: 'problem_definition',
      label: 'Em uma frase é possível definir o problema?',
      placeholder: 'Defina o problema em uma única frase',
      required: false,
    },
  ];

  constructor(
    protected override userFacade: UserFacade,
    protected override route: ActivatedRoute,
    protected override snackBar: MatSnackBar,
    protected override dialog: MatDialog,
    private problemDefinitionFacade: ProblemDefinitionFacade
  ) {
    super(userFacade, route, snackBar, dialog);
    this.responses$ = this.problemDefinitionFacade.responses$;
    this.loading$ = this.problemDefinitionFacade.loading$;
    this.error$ = this.problemDefinitionFacade.error$;
    this.problemDefinition$ = this.problemDefinitionFacade.problemDefinition$;
    this.hasProblemDefinition$ = this.problemDefinition$.pipe(
      map((definition) => !!definition)
    );
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadResponses();
    this.loadProblemDefinition();
  }

  protected override loadResponses(): void {
    this.problemDefinitionFacade.loadResponses(
      this.projectId,
      this.currentUserId
    );
  }

  protected loadProblemDefinition(): void {
    if (this.projectId) {
      this.problemDefinitionFacade.loadProblemDefinition(this.projectId);
    }
  }

  protected override getResponsesByType(
    type: ProblemDefinitionQuadrant
  ): Observable<IResponse[]> {
    return this.problemDefinitionFacade.getResponsesByQuadrant(type);
  }

  protected override getTypeLabel(type: ProblemDefinitionQuadrant): string {
    const labels: Record<ProblemDefinitionQuadrant, string> = {
      [ProblemDefinitionQuadrant.MAIN_QUESTION]: 'Questão principal',
      [ProblemDefinitionQuadrant.TARGET_AUDIENCE]: 'Público alvo',
      [ProblemDefinitionQuadrant.CONSEQUENCES]: 'Consequências',
      [ProblemDefinitionQuadrant.ALTERNATIVE_VIEW]: 'Visão alternativa',
      [ProblemDefinitionQuadrant.SOCIAL_FACTORS]: 'Fatores sociais e culturais',
      [ProblemDefinitionQuadrant.PROBLEM_DEFINITION]: 'Definição do problema',
    };
    return labels[type];
  }

  onSubmit(formData: Record<string, string>): void {
    if (!this.currentUserId || !this.projectId) {
      this.showError('Usuário ou projeto não identificado');
      return;
    }

    const responses: Omit<ProblemDefinitionResponse, 'id'>[] = [];

    try {
      Object.entries(formData).forEach(([type, content]) => {
        if (!content?.trim()) return;

        const lines = content?.split('\n').filter((line) => line?.trim());
        lines.forEach((line) => {
          responses.push({
            type: ProblemDefinitionQuadrant[
              type.toUpperCase() as keyof typeof ProblemDefinitionQuadrant
            ],
            content: line?.trim(),
            userId: this.currentUserId,
            projectId: this.projectId,
            upvotes: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });
      });

      if (responses.length > 0) {
        this.problemDefinitionFacade.createResponses(responses);
        this.showSuccess(
          `${responses.length} resposta(s) criada(s) com sucesso!`
        );
      }
    } catch (error) {
      console.error('Error creating responses:', error);
      this.showError('Erro ao criar respostas. Tente novamente.');
    }
  }

  protected override onUpvote(event: {
    responseId: number;
    hasVoted: boolean;
  }): void {
    if (event.hasVoted) {
      this.problemDefinitionFacade.removeUpvoteResponse(
        event.responseId,
        this.currentUserId
      );
    } else {
      this.problemDefinitionFacade.upvoteResponse(
        event.responseId,
        this.currentUserId
      );
    }
  }

  protected override onToggleSelection(responseId: number): void {
    if (!this.currentUserId) return;
    this.problemDefinitionFacade.toggleResponseSelection(
      responseId,
      this.currentUserId
    );
  }

  protected override onDelete(responseId: number): void {
    this.problemDefinitionFacade.deleteResponse(responseId, this.currentUserId);
  }

  protected override onSaveEdit(event: { id: number; content: string }): void {
    this.problemDefinitionFacade.updateResponse(
      {
        id: event.id,
        content: event.content,
      } as ProblemDefinitionResponse,
      this.currentUserId
    );

    this.snackBar.open('Resposta atualizada com sucesso!', 'Fechar', {
      duration: 3000,
    });
  }

  protected override refreshData(): void {
    this.loadResponses();
    this.loadProblemDefinition();
  }

  protected override showError(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }

  protected override showSuccess(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }

  getSelectedResponsesByType(
    type: ProblemDefinitionQuadrant
  ): Observable<IResponse[]> {
    return this.responses$.pipe(
      map((responses) =>
        responses.filter(
          (response) => response.type === type && response.isSelected
        )
      )
    );
  }

  protected prepareEntity(): any {
    const entity: any = {
      projectId: this.projectId,
      userId: this.currentUserId,
      mainQuestion: [],
      targetAudience: [],
      consequences: [],
      alternativeView: [],
      socialFactors: [],
      problemDefinition: [],
    };

    Object.values(ProblemDefinitionQuadrant).forEach((quadrant) => {
      this.getSelectedResponsesByType(quadrant).subscribe(
        (selectedResponses) => {
          if (selectedResponses.length > 0) {
            // Pegar a primeira resposta selecionada
            selectedResponses.forEach((selectedResponse) => {
              const selectedContent = selectedResponse.content;

              switch (quadrant) {
                case ProblemDefinitionQuadrant.MAIN_QUESTION:
                  entity.mainQuestion.push(selectedContent);
                  break;
                case ProblemDefinitionQuadrant.TARGET_AUDIENCE:
                  entity.targetAudience.push(selectedContent);
                  break;
                case ProblemDefinitionQuadrant.CONSEQUENCES:
                  entity.consequences.push(selectedContent);
                  break;
                case ProblemDefinitionQuadrant.ALTERNATIVE_VIEW:
                  entity.alternativeView.push(selectedContent);
                  break;
                case ProblemDefinitionQuadrant.SOCIAL_FACTORS:
                  entity.socialFactors.push(selectedContent);
                  break;
                case ProblemDefinitionQuadrant.PROBLEM_DEFINITION:
                  entity.problemDefinition.push(selectedContent);
                  break;
              }
            });
          }
        }
      );
    });

    return entity;
  }

  protected createEntity(entity: any): void {
    this.problemDefinitionFacade.createProblemDefinition(entity);
    this.showSuccess('Definição do problema criada com sucesso!');
  }

  // Adicionar novo método para submeter a definição do problema
  onSubmitDefinition(): void {
    this.submitResponses(this.quadrants);
  }
}
