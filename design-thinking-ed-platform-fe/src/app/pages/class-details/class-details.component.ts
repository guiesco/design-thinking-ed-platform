import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, take } from 'rxjs';
import { ProjectSteps } from 'src/app/common/enum/class.enum';
import { IClass } from 'src/app/common/interfaces/class.interface';
import { IGroup } from 'src/app/common/interfaces/group.interface';
import { ClassFacade } from 'src/app/stores/class-state-store/class.facade';
import { GroupFacade } from 'src/app/stores/group-state-store/group.facade';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupDialogComponent } from '../create-group/create-group.component';
import { ConfirmationDialogComponent } from 'src/app/common/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.scss'],
})
export class ClassDetailsComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();

  classId: string = '';
  currentUserId: number = 0;
  classData$ = this.classFacade.selectedClass$;
  loading$ = this.classFacade.loading$;
  error$ = this.classFacade.error$;
  groups$ = this.groupFacade.groups$;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private classFacade: ClassFacade,
    private groupFacade: GroupFacade,
    private userFacade: UserFacade,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initializeUser();
    this.initializeClassId();
    this.loadClassData();
    this.loadGroups();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private initializeUser(): void {
    this.userFacade.user$
      .pipe(take(1), takeUntil(this.destroyed$))
      .subscribe((user) => {
        if (user) {
          this.currentUserId = user.id;
        }
      });
  }

  private initializeClassId(): void {
    this.route.params.pipe(takeUntil(this.destroyed$)).subscribe((params) => {
      this.classId = params['classId'];
    });
  }

  private loadClassData(): void {
    if (this.classId) {
      this.classFacade.findOne(this.classId);
    }
  }

  private loadGroups(): void {
    if (this.classId) {
      this.groupFacade.loadGroups(this.classId, 0, 50);
    }
  }

  parseProjectStep(projectStep: any): string {
    return ProjectSteps[projectStep] || 'Não definida';
  }

  parseGroupName(groups: IGroup[]): string[] {
    return groups.map((group) => group.groupName);
  }

  getStudentsWithoutGroup(classData: IClass | null): any[] {
    if (!classData) return [];

    const studentsInGroups = new Set();
    classData.groups.forEach((group) => {
      group.students.forEach((student) => {
        if (student.id) {
          studentsInGroups.add(student.id);
        }
      });
    });

    // Por enquanto, retornamos uma lista vazia
    // Em uma implementação completa, teríamos acesso aos alunos da turma
    return [];
  }

  openCreateGroupDialog(): void {
    const dialogRef = this.dialog.open(CreateGroupDialogComponent, {
      width: '500px',
      data: { classId: this.classId },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        this.loadGroups();
      });
  }

  deleteGroup(groupId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmar exclusão',
        message:
          'Tem certeza que deseja excluir este grupo? Esta ação não pode ser desfeita.',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          // TODO: Implementar deleteGroup no GroupFacade
          console.log('Excluir grupo:', groupId);
          this.showSuccess('Grupo excluído com sucesso!');
        }
      });
  }

  deleteClass(classData: IClass | null): void {
    if (!classData) return;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmar exclusão da turma',
        message: `Tem certeza que deseja excluir a turma "${classData.className}"? Esta ação não pode ser desfeita e excluirá todos os grupos associados.`,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.classFacade.deleteClass(classData.id);
          this.router.navigate(['/class']);
        }
      });
  }

  editClass(): void {
    // Implementar navegação para edição da turma
    this.router.navigate(['/edit-class', this.classId]);
  }

  navigateToProject(groupId: string): void {
    // Implementar navegação para o projeto do grupo
    this.router.navigate(['/project', groupId]);
  }

  private showSuccess(message: string): void {
    // Implementar notificação de sucesso
    console.log(message);
  }

  goBack(): void {
    this.router.navigate(['/class']);
  }
}
