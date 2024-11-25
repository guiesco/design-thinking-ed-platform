import { Component } from '@angular/core';
import { ClassFacade } from 'src/app/stores/class-state-store/class.facade';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent {
  constructor(readonly classFacade: ClassFacade) {

  }
}
