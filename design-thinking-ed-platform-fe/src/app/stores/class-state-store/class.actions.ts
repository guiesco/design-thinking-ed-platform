import { HttpErrorResponse } from '@angular/common/http';
import { createAction } from '@ngrx/store';
import {
  IClass,
  ICreateClass,
  IFindClass,
} from 'src/app/common/interfaces/class.interface';

export const create = createAction(
  '[Class] create',
  (payload: ICreateClass) => ({
    payload,
  })
);

export const createSuccess = createAction(
  '[Class] createSuccess',
  (payload: IClass) => ({
    payload,
  })
);

export const createError = createAction(
  '[Class] createError',
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
  (id: string) => ({
    id,
  })
);

export const deleteClassSuccess = createAction(
  '[Class] deleteClassSuccess',
  (id: string) => ({
    id,
  })
);

export const deleteClassError = createAction(
  '[Class] deleteClassError',
  (payload: HttpErrorResponse) => ({
    payload,
  })
);

export const findOne = createAction('[Class] findOne', (id: string) => ({
  id,
}));

export const findOneSuccess = createAction(
  '[Class] findOneSuccess',
  (payload: IClass) => ({
    payload,
  })
);

export const findOneError = createAction(
  '[Class] findOneError',
  (payload: HttpErrorResponse) => ({
    payload,
  })
);
