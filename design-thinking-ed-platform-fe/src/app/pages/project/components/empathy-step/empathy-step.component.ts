import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EmpathyMapFacade } from 'src/app/stores/empathy-map-store/empathy-map.facade';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';
import { Store } from '@ngrx/store';
import * as EmpathyMapActions from 'src/app/stores/empathy-map-store/empathy-map.actions';
import { IResponseFormField } from 'src/app/common/components/response-form/response-form.component';
import { IResponse } from 'src/app/common/interfaces/response.interface';
import { BaseStepComponent } from 'src/app/common/components/base-step/base-step.component';
import {
  CreateEmpathyMapResponseDto,
  ResponseType,
} from 'src/app/common/interfaces/empathy-map.interface';

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
  empathyMap$: Observable<any> = this.empathyMapFacade.empathyMap$;
  hasEmpathyMap$: Observable<boolean> = this.empathyMap$.pipe(
    map((empathyMap) => !!empathyMap)
  );

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
    snackBar: MatSnackBar,
    protected override dialog: MatDialog
  ) {
    super(userFacade, route, snackBar, dialog);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadResponses();
    this.loadEmpathyMap();
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

  loadEmpathyMap(): void {
    if (this.projectId) {
      this.empathyMapFacade.loadFinalEmpathyMap(this.projectId);
    }
  }

  getResponsesByType(type: ResponseType): Observable<IResponse[]> {
    return this.responses$.pipe(
      map((responses) => responses.filter((response) => response.type === type))
    );
  }

  getSelectedResponsesByType(type: ResponseType): Observable<IResponse[]> {
    return this.responses$.pipe(
      map((responses) =>
        responses.filter(
          (response) => response.type === type && response.isSelected
        )
      )
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

  override onToggleSelection(responseId: number): void {
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
      this.empathyMapFacade.loadFinalEmpathyMap(this.projectId);
      this.showSuccess('Dados atualizados com sucesso!');
    }
  }

  protected prepareEntity(): any {
    const entity: any = {
      projectId: this.projectId,
      userId: this.currentUserId,
      think: [],
      feel: [],
      say: [],
      do: [],
      pains: [],
      needs: [],
    };

    Object.values(ResponseType).forEach((type) => {
      this.getSelectedResponsesByType(type).subscribe((selectedResponses) => {
        if (selectedResponses.length > 0) {
          selectedResponses.forEach((response) => {
            const content = response.content;

            switch (type) {
              case ResponseType.THINK:
                entity.think.push(content);
                break;
              case ResponseType.FEEL:
                entity.feel.push(content);
                break;
              case ResponseType.SAY:
                entity.say.push(content);
                break;
              case ResponseType.DO:
                entity.do.push(content);
                break;
              case ResponseType.PAINS:
                entity.pains.push(content);
                break;
              case ResponseType.NEEDS:
                entity.needs.push(content);
                break;
            }
          });
        }
      });
    });

    return entity;
  }

  protected createEntity(entity: any): void {
    this.empathyMapFacade.createEmpathyMap(entity);
    this.showSuccess('Mapa de empatia criado com sucesso!');
  }

  onSubmitEmpathyMap(): void {
    this.submitResponses(this.responseTypes);
  }
}
