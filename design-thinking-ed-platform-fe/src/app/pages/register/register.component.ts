import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  classId = this.activatedRoute.snapshot.queryParams['classId'];

  constructor(
    readonly fb: FormBuilder,
    readonly userFacade: UserFacade,
    readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const userMail: string =
      this.activatedRoute.snapshot.queryParams['userEmail'];
    this.registerForm.patchValue({ email: userMail });
  }

  register() {
    this.userFacade.register({
      ...this.registerForm.getRawValue(),
      studentClass: { id: this.classId },
    });
  }
}
