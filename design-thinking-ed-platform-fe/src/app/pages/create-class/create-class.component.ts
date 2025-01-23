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
  createForm = this.fb.nonNullable.group({
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

  async create() {
    const createPayload = this.createForm.getRawValue();
    const createDto: ICreateClass = {
      ...createPayload,
      invitedStudents:
        createPayload.studentEmails?.split(',').map((value) => value.trim()) ??
        null,
      professor: (await this.userFacade.user$.pipe(take(1)).toPromise()) || {},
    };
    this.classFacade.create(createDto);
    this.router.navigate(['class']);
  }
}
