import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpathyMapFacade } from 'src/app/stores/empathy-map-store/empathy-map.facade';
import {
  EmpathyMapEntry,
  EmpathyMapResponse,
  CreateEmpathyMapResponseDto,
  ResponseType,
} from 'src/app/stores/empathy-map-store/empathy-map.service';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';
import { Store } from '@ngrx/store';
import * as EmpathyMapActions from 'src/app/stores/empathy-map-store/empathy-map.actions';
import { IUser } from 'src/app/common/interfaces/user.interface';
import { map, Observable } from 'rxjs';
import { IResponseFormField } from 'src/app/common/components/response-form/response-form.component';
import { IResponse } from 'src/app/common/interfaces/response.interface';
import { ChallengeDefinitionResponse } from 'src/app/common/interfaces/challenge-definition-response.interface';

@Component({
  selector: 'app-empathy-step',
  templateUrl: './empathy-step.component.html',
  styleUrls: ['./empathy-step.component.scss'],
})
export class EmpathyStepComponent implements OnInit {
  ResponseType = ResponseType;
  responseTypes = Object.values(ResponseType);
  responses$: Observable<IResponse[]> = this.empathyMapFacade.responses$.pipe(
    map((responses) =>
      responses.map((response) => ({
        ...response,
        votesCount: response.upvotes || 0,
        hasVoted: response.hasVoted || false,
      }))
    )
  );
  loading$: Observable<boolean> = this.empathyMapFacade.loading$.pipe(
    map((loading) => loading ?? false)
  );
  error$: Observable<any> = this.empathyMapFacade.error$;
  currentUserId!: number;
  projectId: number | null = null;
  isCurrentUser$ = (userId: number) =>
    this.userFacade.user$.pipe(
      map((user: IUser | null) =>
        user?.id ? userId === Number(user.id) : false
      )
    );
  displayedColumns: string[] = ['select', 'content', 'actions'];

  formFields: IResponseFormField[] = [
    {
      key: 'think',
      label: 'Pensa',
      placeholder: 'O que o usuário pensa?',
      required: false,
    },
    {
      key: 'feel',
      label: 'Sente',
      placeholder: 'O que o usuário sente?',
      required: false,
    },
    {
      key: 'say',
      label: 'Diz',
      placeholder: 'O que o usuário diz?',
      required: false,
    },
    {
      key: 'do',
      label: 'Faz',
      placeholder: 'O que o usuário faz?',
      required: false,
    },
    {
      key: 'pains',
      label: 'Dores',
      placeholder: 'Quais são as dores do usuário?',
      required: false,
    },
    {
      key: 'needs',
      label: 'Necessidades',
      placeholder: 'Quais são as necessidades do usuário?',
      required: false,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private userFacade: UserFacade,
    private empathyMapFacade: EmpathyMapFacade,
    private snackBar: MatSnackBar,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.userFacade.user$.subscribe((user: IUser | null) => {
      if (user) {
        this.currentUserId = Number(user.id);
      }
    });

    const projectId = Number(this.route.parent?.snapshot.params['projectId']);
    this.projectId = projectId;
    this.empathyMapFacade.loadResponses(projectId, this.currentUserId);

    this.error$.subscribe((error: any) => {
      if (error) {
        console.error('Error loading empathy map:', error);
      }
    });
  }

  getResponsesByType(type: ResponseType): Observable<IResponse[]> {
    return this.responses$.pipe(
      map((responses) => responses.filter((response) => response.type === type))
    );
  }

  getTypeLabel(type: ResponseType): string {
    const labels: Record<ResponseType, string> = {
      [ResponseType.THINK]: 'Pensa',
      [ResponseType.FEEL]: 'Sente',
      [ResponseType.SAY]: 'Diz',
      [ResponseType.DO]: 'Faz',
      [ResponseType.PAINS]: 'Dores',
      [ResponseType.NEEDS]: 'Necessidades',
    };
    return labels[type];
  }

  onFormSubmit(formData: Record<string, string>): void {
    if (this.projectId === null) return;

    this.userFacade.user$.subscribe((user) => {
      if (user) {
        const userId = Number(user.id);
        let responsesCreated = 0;

        try {
          Object.entries(formData).forEach(([type, content]) => {
            if (!content.trim()) return; // Skip empty fields

            const lines = content.split('\n').filter((line) => line.trim());
            lines.forEach((line) => {
              const newResponse: CreateEmpathyMapResponseDto = {
                type: ResponseType[
                  type.toUpperCase() as keyof typeof ResponseType
                ],
                content: line.trim(),
                userId,
                projectId: this.projectId!,
              };
              this.empathyMapFacade.createResponse(newResponse);
              responsesCreated++;
            });
          });

          if (responsesCreated > 0) {
            this.snackBar.open(
              `${responsesCreated} resposta(s) criada(s) com sucesso!`,
              'Fechar',
              {
                duration: 3000,
                horizontalPosition: 'end',
                verticalPosition: 'top',
              }
            );
          }
        } catch (error) {
          console.error('Error creating responses:', error);
          this.snackBar.open(
            'Erro ao criar respostas. Tente novamente.',
            'Fechar',
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
            }
          );
        }
      }
    });
  }

  onUpvoteResponse(responseId: number, hasVoted: boolean): void {
    if (!hasVoted) {
      this.empathyMapFacade.upvoteResponse(responseId, this.currentUserId);
    } else {
      this.empathyMapFacade.removeUpvoteResponse(
        responseId,
        this.currentUserId
      );
    }
  }

  onToggleResponseSelection(responseId: number): void {
    this.empathyMapFacade.toggleResponseSelection(responseId);
  }

  onDeleteResponse(id: number): void {
    if (this.currentUserId) {
      this.store.dispatch(
        EmpathyMapActions.deleteResponse({ id, userId: this.currentUserId })
      );
    }
  }

  onEditResponse(response: IResponse): void {
    // Implementação será feita no componente de lista
  }

  onSaveEditResponse(data: { id: number; content: string }): void {
    if (this.currentUserId) {
      this.empathyMapFacade.updateResponse(
        data.id,
        this.currentUserId,
        data.content
      );
    }
  }

  refreshData(): void {
    if (this.projectId) {
      this.empathyMapFacade.loadResponses(this.projectId, this.currentUserId);
      this.snackBar.open('Dados atualizados com sucesso!', 'Fechar', {
        duration: 2000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    }
  }
}
