import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { combineLatest, map, switchMap, take, tap } from 'rxjs';
import { ProjectSteps } from 'src/app/common/enum/class.enum';
import { IClass, IFindClass } from 'src/app/common/interfaces/class.interface';
import { ClassFacade } from 'src/app/stores/class-state-store/class.facade';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ClassDialogComponent } from './class-dialog/class-dialog.component';
import { IGroup } from 'src/app/common/interfaces/group.interface';
import { __values } from 'tslib';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  userId!: string;
  classes$ = this.classFacade.classes$;
  pageConfig: { skip: number; take: number } = { skip: 0, take: 10 };

  constructor(
    public classFacade: ClassFacade,
    private userFacade: UserFacade
  ) {}

  ngOnInit(): void {
    this.userFacade.user$
      .pipe(
        take(1),
        tap((user) => {
          this.userId = user?.id ?? '0';
          this.fetchData();
        })
      )
      .subscribe();
  }

  fetchData(): void {
    if (!this.userId) return;
    this.classFacade.loadClasses(
      this.userId,
      this.pageConfig.skip,
      this.pageConfig.take
    );
  }

  parseProjectStep(projectStep: any) {
    return ProjectSteps[projectStep];
  }

  parseGroupName(groups: any) {
    return groups.map((gp: IGroup) => gp.groupName);
  }

  deleteClass(id: string) {
    this.classFacade.deleteClass(id);
  }
  openDialog(classEntity: IClass) {
    const dialogRef = this.dialog.open(ClassDialogComponent, {
      data: classEntity,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logData(data: any) {
    console.log(data.className);
  }
}
