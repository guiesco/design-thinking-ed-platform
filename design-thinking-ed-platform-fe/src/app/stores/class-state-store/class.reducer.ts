import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './class.actions';
import { ClassStoreModel } from './class.model';
import { IClass } from 'src/app/common/interfaces/class.interface';

export const classInitialState: ClassStoreModel = {
  classes: [],
  selectedClass: null,
  loading: false,
  error: null,
};

export const classReducerFn = createReducer(
  classInitialState,

  on(
    actions.findAllSuccess,
    (state: ClassStoreModel, { payload }: { payload: IClass[] }) => ({
      ...state,
      classes: payload,
    })
  ),

  on(
    actions.findSuccess,
    (state: ClassStoreModel, { payload }: { payload: IClass[] }) => ({
      ...state,
      classes: payload,
    })
  ),

  on(actions.deleteClassSuccess, (state, { id }) => ({
    ...state,
    classes: state?.classes?.filter((cls) => cls.id !== id) || [],
  })),

  on(actions.createSuccess, (state, { payload }) => ({
    ...state,
    classes: [...state.classes, payload],
  })),

  on(actions.findOne, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(actions.findOneSuccess, (state, { payload }) => ({
    ...state,
    selectedClass: payload,
    loading: false,
    error: null,
  })),

  on(actions.findOneError, (state, { payload }) => ({
    ...state,
    selectedClass: null,
    loading: false,
    error: payload.message,
  }))
);

export function classReducer(
  state: ClassStoreModel,
  action: Action
): ClassStoreModel {
  return classReducerFn(state, action);
}
