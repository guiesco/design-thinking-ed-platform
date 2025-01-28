import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, take } from 'rxjs';
import { UserTypeEnum } from 'src/app/common/enum/user.enum';
import { GroupFacade } from 'src/app/stores/group-state-store/group.facade';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';
import { CreateGroupDialogComponent } from '../create-group/create-group.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss', '../class/class.component.scss'],
})
export class HomepageComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  readonly isUserProfessor$ = this.userFacade.user$.pipe(
    map((user) => user?.userType === UserTypeEnum.PROFESSOR)
  );
  userId!: string;
  classId!: string;
  step!: string;

  constructor(
    readonly userFacade: UserFacade,
    readonly groupFacade: GroupFacade,
    readonly router: Router
  ) {}

  ngOnInit(): void {
    this.isUserProfessor$.subscribe((isProf) => {
      if (isProf) {
        this.loadProfessorHome();
      } else {
        this.loadStudentHome();
      }
    });
  }

  loadProfessorHome() {
    this.router.navigate(['class']);
  }

  loadStudentHome() {
    this.userFacade.user$.pipe(take(1)).subscribe((user) => {
      this.userId = user.id.toString();
      this.classId = user.studentClass.id;
      if (!user?.group) {
        this.groupFacade.loadGroups(this.classId, 0, 10);
        this.step = 'chooseGroup';
      } else {
        this.step = 'showProject';
      }
    });
  }

  openCreateGroupDialog() {
    const dialogRef = this.dialog.open(CreateGroupDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        this.groupFacade.loadGroups(this.classId, 0, 10);
      });
  }

  joinGroup(groupId: string) {
    this.userFacade.joinGroup(this.userId, groupId);
    this.refreshUser();
  }

  refreshUser() {
    this.userFacade.user$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.userFacade.login(user);
      }
    });
  }
}
