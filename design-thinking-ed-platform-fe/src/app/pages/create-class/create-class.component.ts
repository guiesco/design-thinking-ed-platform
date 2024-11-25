import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.scss'],
})
export class CreateClassComponent {
  createClassForm = this.fb.group({
    className: ['', Validators.required],
    studentEmails: ['', Validators.required],
    semester: ['', Validators.required],
  });

  constructor(readonly fb: FormBuilder, readonly userFacade: UserFacade) {}
  createClass() {}
}
