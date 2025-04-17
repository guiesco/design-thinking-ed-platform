import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
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
import { IResponseFormField } from 'src/app/common/components/response-form/response-form.component';
import { IResponse } from 'src/app/common/interfaces/response.interface';
import { BaseStepComponent } from 'src/app/common/components/base-step/base-step.component';

@Component({
  selector: 'app-empathy-step',
  templateUrl: './empathy-step.component.html',
  styleUrls: ['./empathy-step.component.scss', '../../project.component.scss'],
})
export class EmpathyStepComponent extends BaseStepComponent {
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

  override formFields: IResponseFormField[] = [
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
    private empathyMapFacade: EmpathyMapFacade,
    private store: Store,
    userFacade: UserFacade,
    route: ActivatedRoute,
    snackBar: MatSnackBar
  ) {
    super(userFacade, route, snackBar);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadResponses();
    this.error$.subscribe((error: any) => {
      if (error) {
        this.showError('Erro ao carregar mapa de empatia: ' + error);
      }
    });
  }

  loadResponses(): void {
    if (this.projectId && this.currentUserId) {
      this.empathyMapFacade.loadResponses(this.projectId, this.currentUserId);
    }
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

  onSubmit(formData: Record<string, string>): void {
    if (!this.currentUserId || !this.projectId) {
      this.showError('Usuário ou projeto não identificado');
      return;
    }

    const responses: CreateEmpathyMapResponseDto[] = [];

    try {
      Object.entries(formData).forEach(([type, content]) => {
        if (!content?.trim()) return;

        const lines = content?.split('\n').filter((line) => line?.trim());
        lines.forEach((line) => {
          responses.push({
            type: ResponseType[type.toUpperCase() as keyof typeof ResponseType],
            content: line?.trim(),
            userId: this.currentUserId,
            projectId: this.projectId,
          });
        });
      });

      if (responses.length > 0) {
        this.empathyMapFacade.createResponses(responses);
        this.showSuccess(
          `${responses.length} resposta(s) criada(s) com sucesso!`
        );
      }
    } catch (error) {
      console.error('Error creating responses:', error);
      this.showError('Erro ao criar respostas. Tente novamente.');
    }
  }

  onUpvote(event: { responseId: number; hasVoted: boolean }): void {
    if (!this.currentUserId) return;

    if (event.hasVoted) {
      this.empathyMapFacade.removeUpvoteResponse(
        event.responseId,
        this.currentUserId
      );
    } else {
      this.empathyMapFacade.upvoteResponse(
        event.responseId,
        this.currentUserId
      );
    }
  }

  onToggleSelection(responseId: number): void {
    this.empathyMapFacade.toggleResponseSelection(responseId);
  }

  onDelete(responseId: number): void {
    if (this.currentUserId) {
      this.store.dispatch(
        EmpathyMapActions.deleteResponse({
          id: responseId,
          userId: this.currentUserId,
        })
      );
    }
  }

  onEdit(response: IResponse): void {
    // Implementação será feita no componente de lista
  }

  onSaveEdit(event: { id: number; content: string }): void {
    if (this.currentUserId) {
      this.empathyMapFacade.updateResponse(
        event.id,
        this.currentUserId,
        event.content
      );
    }
  }

  refreshData(): void {
    if (this.projectId && this.currentUserId) {
      this.empathyMapFacade.loadResponses(this.projectId, this.currentUserId);
      this.showSuccess('Dados atualizados com sucesso!');
    }
  }
}
