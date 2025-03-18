import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpathyMapFacade } from 'src/app/stores/empathy-map-store/empathy-map.facade';
import { EmpathyMapEntry } from 'src/app/stores/empathy-map-store/empathy-map.service';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-empathy-step',
  templateUrl: './empathy-step.component.html',
  styleUrls: ['./empathy-step.component.scss'],
})
export class EmpathyStepComponent implements OnInit {
  entries$ = this.empathyMapFacade.entries$;
  loading$ = this.empathyMapFacade.loading$;
  error$ = this.empathyMapFacade.error$;
  currentUser$ = this.userFacade.user$;
  isCurrentUser$ = (userId: number) =>
    this.currentUser$.pipe(
      map((user) => (user?.id ? userId === Number(user.id) : false))
    );

  newEntry: Partial<EmpathyMapEntry> = {
    think: '',
    feel: '',
    say: '',
    do: '',
  };

  constructor(
    private route: ActivatedRoute,
    private userFacade: UserFacade,
    private empathyMapFacade: EmpathyMapFacade,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const projectId = Number(
      this.route.parent?.snapshot.paramMap.get('projectId')
    );
    this.empathyMapFacade.loadEmpathyMaps(projectId);

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
      console.log(
        '🚀 ~ EmpathyStepComponent ~ this.userFacade.user$.subscribe ~ user:',
        user
      );
      if (user) {
        const newEntry: EmpathyMapEntry = {
          ...this.newEntry,
          userId: Number(user.id),
          projectId,
          upvotes: 0,
          downvotes: 0,
          isSelected: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        } as EmpathyMapEntry;
        this.empathyMapFacade.createEmpathyMap(newEntry);
        this.newEntry = {
          think: '',
          feel: '',
          say: '',
          do: '',
        };
        this.snackBar.open('Mapa de empatia criado com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
    });
  }

  onUpvote(entryId: number): void {
    this.empathyMapFacade.upvoteEmpathyMap(entryId);
  }

  onDownvote(entryId: number): void {
    this.empathyMapFacade.downvoteEmpathyMap(entryId);
  }

  onToggleSelection(entryId: number): void {
    this.empathyMapFacade.toggleEmpathyMapSelection(entryId);
  }
}
