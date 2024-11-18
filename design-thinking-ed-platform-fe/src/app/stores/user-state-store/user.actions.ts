import { HttpErrorResponse } from '@angular/common/http';
import { createAction } from '@ngrx/store';
import { ILoginData, IUser } from 'src/app/common/interfaces/user.interface';

export const login = createAction('[User] login', (payload: ILoginData) => ({
  payload,
}));

export const loginSuccess = createAction(
  '[User] loginSuccess',
  (payload: IUser) => ({
    payload,
  })
);

export const loginError = createAction(
  '[User] loginError',
  (payload: HttpErrorResponse) => ({
    payload,
  })
);
