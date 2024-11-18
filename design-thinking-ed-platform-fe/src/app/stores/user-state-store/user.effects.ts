import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './user.actions';
import { UserService } from './user.service';
import { ILoginData } from 'src/app/common/interfaces/user.interface';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService // private readonly toastService: ToastService, // private readonly translatePipe: TranslatePipe,
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.login),
      exhaustMap(({ payload }: { payload: ILoginData }) =>
        this.userService.login(payload).pipe(
          map((data) => actions.loginSuccess(data)),
          catchError((error) => of(actions.loginError(error)))
        )
      )
    )
  );
}
