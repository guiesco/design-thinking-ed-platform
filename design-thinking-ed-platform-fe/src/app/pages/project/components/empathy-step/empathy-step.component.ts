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
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as EmpathyMapActions from 'src/app/stores/empathy-map-store/empathy-map.actions';

@Component({
  selector: 'app-empathy-step',
  templateUrl: './empathy-step.component.html',
  styleUrls: ['./empathy-step.component.scss'],
})
export class EmpathyStepComponent implements OnInit {
  ResponseType = ResponseType;
  entries$ = this.empathyMapFacade.entries$;
  responses$ = this.empathyMapFacade.responses$;
  loading$ = this.empathyMapFacade.loading$;
  error$ = this.empathyMapFacade.error$;
  currentUser$ = this.userFacade.user$;
  isCurrentUser$ = (userId: number) =>
    this.currentUser$.pipe(
      map((user) => (user?.id ? userId === Number(user.id) : false))
    );
  currentUserId?: number;

  displayedColumns: string[] = ['select', 'content', 'actions'];

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
  ) {
    this.userFacade.user$.subscribe((user) => {
      if (user) {
        this.currentUserId = Number(user.id);
      }
    });
  }

  ngOnInit(): void {
    const projectId = Number(
      this.route.parent?.snapshot.paramMap.get('projectId')
    );
    this.empathyMapFacade.loadEmpathyMaps(projectId);
    this.empathyMapFacade.loadResponses(projectId);

    this.error$.subscribe((error) => {
      if (error) {
        this.snackBar.open(error, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
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

  onUpvoteResponse(responseId: number): void {
    this.empathyMapFacade.upvoteResponse(responseId);
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
}
