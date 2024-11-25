import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './user.actions';
import { IUser } from 'src/app/common/interfaces/user.interface';
import { UserStoreModel } from './user.model';
//install ngrx store

export const userInitialState: UserStoreModel = {
  user: null,
};

export const userReducerFn = createReducer(
  userInitialState,

  on(
    actions.loginSuccess,
    (state: UserStoreModel, { payload }: { payload: IUser[] }) => ({
      ...state,
      user: payload[0],
    })
  )
);

export function userReducer(
  state: UserStoreModel,
  action: Action
): UserStoreModel {
  return userReducerFn(state, action);
}
