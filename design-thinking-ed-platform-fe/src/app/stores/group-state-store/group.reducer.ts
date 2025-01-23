import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './group.actions';
import { IGroup } from 'src/app/common/interfaces/group.interface';
import { GroupStoreModel } from './group.model';
//install ngrx store

export const groupInitialState: GroupStoreModel = {
  groups: [],
};

export const groupReducerFn = createReducer(
  groupInitialState,
  on(
    actions.findSuccess,
    (state: GroupStoreModel, { payload }: { payload: IGroup[] }) => ({
      ...state,
      groups: payload,
    })
  )
);

export function groupReducer(
  state: GroupStoreModel,
  action: Action
): GroupStoreModel {
  return groupReducerFn(state, action);
}
