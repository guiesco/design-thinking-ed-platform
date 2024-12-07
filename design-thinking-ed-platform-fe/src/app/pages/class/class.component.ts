import { Component, OnInit } from '@angular/core';
import { combineLatest, map, switchMap, take, tap } from 'rxjs';
import { ProjectSteps } from 'src/app/common/enum/class.enum';
import { IFindClass } from 'src/app/common/interfaces/class.interface';
import { ClassFacade } from 'src/app/stores/class-state-store/class.facade';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnInit {
  userId!: number;
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

  deleteClass(id: number) {
    this.classFacade.deleteClass(id);
  }
}
