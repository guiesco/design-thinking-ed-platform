import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  isRememberMe = false;

  constructor(readonly fb: FormBuilder, readonly userFacade: UserFacade) {}

  login() {
    this.userFacade.login(this.loginForm.getRawValue());
  }
}
