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
import { Router } from '@angular/router';
import { IGroup } from 'src/app/common/interfaces/group.interface';

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
    private userFacade: UserFacade,
    private router: Router
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

  parseGroupName(groups: any) {
    return groups.map((gp: IGroup) => gp.groupName);
  }

  deleteClass(id: string) {
    this.classFacade.deleteClass(id);
  }
  openClassDetails(classEntity: IClass) {
    this.router.navigate(['/class', classEntity.id]);
  }

  logData(data: any) {
    console.log(data.className);
  }
}
