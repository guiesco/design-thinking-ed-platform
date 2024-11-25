import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './class.actions';
import { ClassStoreModel } from './class.model';
//install ngrx store

export const classInitialState: ClassStoreModel = {
  class: null,
};

export const classReducerFn = createReducer(classInitialState);

export function classReducer(
  state: ClassStoreModel,
  action: Action
): ClassStoreModel {
  return classReducerFn(state, action);
}
