import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs';
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
  constructor(
    public classFacade: ClassFacade,
    private userFacade: UserFacade
  ) {}

  ngOnInit(): void {
    this.fetchData(0, 10);
  }

  fetchData(offset: number, limit: number): void {
    this.userFacade.user$.pipe(take(1)).subscribe((user) => {
      const findQuery: IFindClass = {
        professor: { id: user?.id },
        offset,
        limit,
      };
      this.classFacade.find(findQuery);
    });
  }

  parseProjectStep(projectStep: any) {
    return ProjectSteps[projectStep];
  }

  deleteClass(id: number) {
    this.classFacade.deleteClass(id);
    this.fetchData(0, 10);
  }
}
