import { HttpErrorResponse } from '@angular/common/http';
import { createAction } from '@ngrx/store';
import {
  IClass,
  ICreateClass,
  IFindClass,
} from 'src/app/common/interfaces/class.interface';

export const createClass = createAction(
  '[Class] create',
  (payload: ICreateClass) => ({
    payload,
  })
);

export const createClassSuccess = createAction(
  '[Class] createClassSuccess',
  (payload: ICreateClass) => ({
    payload,
  })
);

export const createClassError = createAction(
  '[Class] createClassError',
  (payload: HttpErrorResponse) => ({
    payload,
  })
);

export const findAll = createAction('[Class] findAll');

export const findAllSuccess = createAction(
  '[Class] findAllSuccess',
  (payload: IClass[]) => ({
    payload,
  })
);

export const findAllError = createAction(
  '[Class] findAllError',
  (payload: HttpErrorResponse) => ({
    payload,
  })
);

export const find = createAction('[Class] find', (query: IFindClass) => ({
  query,
}));

export const findSuccess = createAction(
  '[Class] findSuccess',
  (payload: IClass[]) => ({
    payload,
  })
);

export const findError = createAction(
  '[Class] findError',
  (payload: HttpErrorResponse) => ({
    payload,
  })
);

export const deleteClass = createAction(
  '[Class] deleteClass',
  (id: number) => ({
    id,
  })
);

export const deleteClassSuccess = createAction('[Class] deleteClassSuccess');

export const deleteClassError = createAction(
  '[Class] deleteClassError',
  (payload: HttpErrorResponse) => ({
    payload,
  })
);
