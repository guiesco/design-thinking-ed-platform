import { createReducer, on } from '@ngrx/store';
import { IUser } from 'src/app/common/interfaces/user.interface';
import * as UserActions from './user.actions';

export interface UserState {
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  // Login
  on(UserActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(UserActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Register
  on(UserActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(UserActions.registerFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Update
  on(UserActions.update, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.updateSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(UserActions.updateFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Load from Storage
  on(UserActions.loadUserFromStorageSuccess, (state, { user }) => ({
    ...state,
    user,
  })),

  // Logout
  on(UserActions.logout, () => initialState)
);
