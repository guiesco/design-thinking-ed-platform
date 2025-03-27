import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
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

@Component({
  selector: 'app-empathy-step',
  templateUrl: './empathy-step.component.html',
  styleUrls: ['./empathy-step.component.scss'],
})
export class EmpathyStepComponent implements OnInit {
  ResponseType = ResponseType;
  entries$: Observable<EmpathyMapEntry[]> = this.empathyMapFacade.entries$;
  responses$: Observable<EmpathyMapResponse[]> =
    this.empathyMapFacade.responses$;
  loading$: Observable<boolean> = this.empathyMapFacade.loading$;
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
  editingResponseId: number | null = null;
  editingContent: string = '';

  newEntry = {
    think: '',
    feel: '',
    say: '',
    do: '',
    pains: '',
    needs: '',
  };

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

    this.route.params.subscribe((params) => {
      const projectId = Number(this.route.parent?.snapshot.params['projectId']);
      this.projectId = projectId;
      this.empathyMapFacade.loadResponses(projectId, this.currentUserId);

      this.error$.subscribe((error: any) => {
        if (error) {
          console.error('Error loading empathy map:', error);
        }
      });
    });
  }

  onSubmit(): void {
    const projectId = Number(
      this.route.parent?.snapshot.paramMap.get('projectId')
    );
    this.userFacade.user$.subscribe((user) => {
      if (user) {
        const userId = Number(user.id);
        let responsesCreated = 0;

        // Processa cada campo e cria respostas para cada linha não vazia
        Object.entries(this.newEntry).forEach(([type, content]) => {
          const lines = content.split('\n').filter((line) => line.trim());
          lines.forEach((line) => {
            const newResponse: CreateEmpathyMapResponseDto = {
              type: ResponseType[
                type.toUpperCase() as keyof typeof ResponseType
              ],
              content: line.trim(),
              userId,
              projectId,
            };
            this.empathyMapFacade.createResponse(newResponse);
            responsesCreated++;
          });
        });

        // Limpa o formulário
        this.newEntry = {
          think: '',
          feel: '',
          say: '',
          do: '',
          pains: '',
          needs: '',
        };

        // Mostra mensagem de sucesso
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
    });
  }

  onUpvoteResponse(responseId: number, hasVoted: boolean): void {
    console.log(
      '🚀 ~ EmpathyStepComponent ~ onUpvoteResponse ~ hasVoted:',
      hasVoted
    );
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

  getResponsesByType(type: ResponseType) {
    return this.empathyMapFacade.getResponsesByType(type);
  }

  onDeleteResponse(id: number): void {
    if (this.currentUserId) {
      this.store.dispatch(
        EmpathyMapActions.deleteResponse({ id, userId: this.currentUserId })
      );
    }
  }

  startEditing(response: EmpathyMapResponse): void {
    this.editingResponseId = response.id;
    this.editingContent = response.content;
  }

  cancelEditing(): void {
    this.editingResponseId = null;
    this.editingContent = '';
  }

  saveEdit(): void {
    if (this.editingResponseId && this.currentUserId) {
      this.empathyMapFacade.updateResponse(
        this.editingResponseId,
        this.currentUserId,
        this.editingContent
      );
      this.editingResponseId = null;
      this.editingContent = '';
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

  loadResponses(): void {
    if (this.projectId) {
      this.empathyMapFacade.loadResponses(
        this.projectId,
        Number(this.currentUserId)
      );
    }
  }
}
