import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { combineLatest, map, switchMap, take, tap } from 'rxjs';
import { ProjectSteps } from 'src/app/common/enum/class.enum';
import { IClass, IFindClass } from 'src/app/common/interfaces/class.interface';
import { ClassFacade } from 'src/app/stores/class-state-store/class.facade';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ClassDialogComponent } from './class-dialog/class-dialog.component';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  userId!: number;
  classes$ = this.classFacade.classes$;
  pageConfig: { skip: number; take: number } = { skip: 0, take: 10 };

  constructor(
    public classFacade: ClassFacade,
    private userFacade: UserFacade
  ) { }

  ngOnInit(): void {
    this.userFacade.user$
      .pipe(
        take(1),
        tap((user) => {
          this.userId = user?.id ?? 0;
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

  // parseGroupName(group: any) {
  //   return group.groupName;
  // }

  deleteClass(id: number) {
    this.classFacade.deleteClass(id);
  }
  openDialog(classEntity: IClass) {
    console.log("🚀 ~ ClassComponent ~ openDialog ~ classEntity:", classEntity)
    console.log("🚀 ~ ClassComponent ~ openDialog ~ ClassDialogComponent:", ClassDialogComponent)
    const dialogRef = this.dialog.open(ClassDialogComponent, { data: classEntity });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logData(data: any) {
    console.log(data.className)
  }
}
