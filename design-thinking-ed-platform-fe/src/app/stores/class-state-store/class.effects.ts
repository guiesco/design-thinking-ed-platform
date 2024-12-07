import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './class.actions';
import { ClassService } from './class.service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { ICreateClass } from 'src/app/common/interfaces/class.interface';

@Injectable()
export class ClassEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly classService: ClassService
  ) {}

  createClass$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createClass),
      exhaustMap(({ payload }: { payload: ICreateClass }) =>
        this.classService.createClass(payload).pipe(
          map((data) => actions.createClassSuccess(data)),
          catchError((error) => of(actions.createClassError(error)))
        )
      )
    )
  );

  findAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.findAll),
      exhaustMap(() =>
        this.classService.findAll().pipe(
          map((data) => actions.findAllSuccess(data)),
          catchError((error) => of(actions.findAllError(error)))
        )
      )
    )
  );

  find$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.find),
      exhaustMap(({ query }) =>
        this.classService.find(query).pipe(
          map((data) => actions.findSuccess(data)),
          catchError((error) => of(actions.findError(error)))
        )
      )
    )
  );

  deleteClass$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.deleteClass),
      exhaustMap(({ id }) =>
        this.classService.deleteClass(id).pipe(
          map((data) => actions.deleteClassSuccess(id)),
          catchError((error) => of(actions.deleteClassError(error)))
        )
      )
    )
  );
}
