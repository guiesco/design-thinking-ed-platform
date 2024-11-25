import { Component, OnInit } from '@angular/core';
import { ProjectSteps } from 'src/app/common/enum/class.enum';
import { ClassFacade } from 'src/app/stores/class-state-store/class.facade';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent implements OnInit {
  constructor(readonly classFacade: ClassFacade) {}

  ngOnInit(): void {
    this.classFacade.fetchClasses();
  }

  parseProjectStep(projectStep: any) {
    return ProjectSteps[projectStep];
  }
}
