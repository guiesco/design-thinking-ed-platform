import { HttpErrorResponse } from '@angular/common/http';
import { createAction } from '@ngrx/store';
import {
  ILoginData,
  IRegisterData,
  IUser,
} from 'src/app/common/interfaces/user.interface';

export const login = createAction('[User] login', (payload: ILoginData) => ({
  payload,
}));

export const loginSuccess = createAction(
  '[User] loginSuccess',
  (payload: IUser[]) => ({
    payload,
  })
);

export const loginError = createAction(
  '[User] loginError',
  (payload: HttpErrorResponse) => ({
    payload,
  })
);

export const register = createAction(
  '[User] register',
  (payload: IRegisterData) => ({
    payload,
  })
);

export const registerSuccess = createAction(
  '[User] registerSuccess',
  (payload: IUser) => ({
    payload,
  })
);

export const registerError = createAction(
  '[User] registerError',
  (payload: HttpErrorResponse) => ({
    payload,
  })
);
