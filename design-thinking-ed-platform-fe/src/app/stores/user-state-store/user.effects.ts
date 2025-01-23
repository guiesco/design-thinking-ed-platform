import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './user.actions';
import { UserService } from './user.service';
import {
  ILoginData,
  IRegisterData,
  IUser,
} from 'src/app/common/interfaces/user.interface';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { UserTypeEnum } from 'src/app/common/enum/user.enum';

@Injectable()
export class UserEffects {
  constructor(
    private readonly router: Router,
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

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.loginSuccess),
        exhaustMap(({ payload }: { payload: IUser[] }) => {
          return this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.register),
      exhaustMap(({ payload }: { payload: IRegisterData }) =>
        this.userService.register(payload).pipe(
          map((data) => actions.registerSuccess(data)),
          catchError((error) => of(actions.registerError(error)))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.update),
      exhaustMap(({ userId, user }) =>
        this.userService.update(userId, user).pipe(
          map((data) => actions.updateSuccess(data)),
          catchError((error) => of(actions.updateError(error)))
        )
      )
    )
  );
}
