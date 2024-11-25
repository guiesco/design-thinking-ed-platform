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

  fetchClasses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.fetchClasses),
      exhaustMap(() =>
        this.classService.fetchClasses().pipe(
          map((data) => actions.fetchClassesSuccess(data)),
          catchError((error) => of(actions.fetchClassesError(error)))
        )
      )
    )
  );
}
