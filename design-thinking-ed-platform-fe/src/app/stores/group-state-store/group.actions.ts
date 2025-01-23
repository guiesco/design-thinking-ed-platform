import { HttpErrorResponse } from '@angular/common/http';
import { createAction } from '@ngrx/store';
import {
  ICreateGroup,
  IFindGroup,
  IGroup,
} from 'src/app/common/interfaces/group.interface';

export const create = createAction(
  '[Group] create',
  (payload: ICreateGroup) => ({
    payload,
  })
);

export const createSuccess = createAction(
  '[Group] createSuccess',
  (payload: IGroup) => ({
    payload,
  })
);

export const createError = createAction(
  '[Group] createError',
  (payload: HttpErrorResponse) => ({
    payload,
  })
);

export const find = createAction('[Group] find', (query: IFindGroup) => ({
  query,
}));

export const findSuccess = createAction(
  '[Group] findSuccess',
  (payload: IGroup[]) => ({
    payload,
  })
);

export const findError = createAction(
  '[Group] findError',
  (payload: HttpErrorResponse) => ({
    payload,
  })
);

export const update = createAction(
  '[Group] update',
  (groupId: string, group: Partial<IGroup>) => ({ groupId, group })
);

export const updateSuccess = createAction(
  '[Group] updateSuccess',
  (payload: IGroup) => ({
    payload,
  })
);

export const updateError = createAction(
  '[Group] updateError',
  (payload: HttpErrorResponse) => ({
    payload,
  })
);
