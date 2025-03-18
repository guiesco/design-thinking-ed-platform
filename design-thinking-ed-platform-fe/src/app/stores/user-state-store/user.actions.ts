import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import {
  ILoginData,
  IRegisterData,
  IUser,
} from 'src/app/common/interfaces/user.interface';

// Login Actions
export const login = createAction(
  '[User] Login',
  props<{ loginData: ILoginData }>()
);

export const loginSuccess = createAction(
  '[User] Login Success',
  props<{ user: IUser }>()
);

export const loginFailure = createAction(
  '[User] Login Failure',
  props<{ error: string }>()
);

// Register Actions
export const register = createAction(
  '[User] Register',
  props<{ registerData: IRegisterData }>()
);

export const registerSuccess = createAction(
  '[User] Register Success',
  props<{ user: IUser }>()
);

export const registerFailure = createAction(
  '[User] Register Failure',
  props<{ error: string }>()
);

// Update Actions
export const update = createAction(
  '[User] Update',
  props<{ id: string; user: Partial<IUser> }>()
);

export const updateSuccess = createAction(
  '[User] Update Success',
  props<{ user: IUser }>()
);

export const updateFailure = createAction(
  '[User] Update Failure',
  props<{ error: string }>()
);

// Load User from Storage Actions
export const loadUserFromStorage = createAction(
  '[User] Load User from Storage'
);

export const loadUserFromStorageSuccess = createAction(
  '[User] Load User from Storage Success',
  props<{ user: IUser }>()
);

// Logout Action
export const logout = createAction('[User] Logout');
