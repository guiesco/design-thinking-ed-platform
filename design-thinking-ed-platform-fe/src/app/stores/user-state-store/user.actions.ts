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

export const update = createAction(
  '[User] update',
  (userId: string, user: Partial<IUser>) => ({ userId, user })
);

export const updateSuccess = createAction(
  '[User] updateSuccess',
  (payload: IUser) => ({
    payload,
  })
);

export const updateError = createAction(
  '[User] updateError',
  (payload: HttpErrorResponse) => ({
    payload,
  })
);
