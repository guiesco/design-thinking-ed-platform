import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ICreateClass } from 'src/app/common/interfaces/class.interface';
import { ClassFacade } from 'src/app/stores/class-state-store/class.facade';
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

  constructor(
    readonly fb: FormBuilder,
    readonly classFacade: ClassFacade,
    readonly userFacade: UserFacade,
    private router: Router
  ) {}

  async createClass() {
    const createClassPayload = this.createClassForm.getRawValue();
    const createClassDto: ICreateClass = {
      ...createClassPayload,
      invitedStudents:
        createClassPayload.studentEmails
          ?.split(',')
          .map((value) => value.trim()) ?? null,
      professor: await this.userFacade.user$.pipe(take(1)).toPromise(),
    };
    this.classFacade.createClass(createClassDto);
    this.router.navigate(['class']);
  }
}
