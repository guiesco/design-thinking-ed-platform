import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserFacade } from 'src/app/stores/user-state-store/user.facade';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(readonly fb: FormBuilder, readonly userFacade: UserFacade) {}

  register() {
    this.userFacade.register(this.registerForm.getRawValue());
  }
}
