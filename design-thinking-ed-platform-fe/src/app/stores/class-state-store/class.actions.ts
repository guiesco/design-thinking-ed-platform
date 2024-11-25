import { HttpErrorResponse } from '@angular/common/http';
import { createAction } from '@ngrx/store';
import {
  IClass,
  ICreateClass,
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
