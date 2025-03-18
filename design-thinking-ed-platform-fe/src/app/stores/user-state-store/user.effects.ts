import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      mergeMap(({ loginData }) =>
        this.userService.login(loginData).pipe(
          map(([user]) => UserActions.loginSuccess({ user })),
          catchError((error) =>
            of(UserActions.loginFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.loginSuccess),
        tap(() => {
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.register),
      mergeMap(({ registerData }) =>
        this.userService.register(registerData).pipe(
          map((user) => UserActions.registerSuccess({ user })),
          catchError((error) =>
            of(UserActions.registerFailure({ error: error.message }))
          )
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.registerSuccess),
        tap(() => {
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.update),
      mergeMap(({ id, user }) =>
        this.userService.update(id, user).pipe(
          map((updatedUser) =>
            UserActions.updateSuccess({ user: updatedUser })
          ),
          catchError((error) =>
            of(UserActions.updateFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadUserFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserFromStorage),
      mergeMap(() =>
        this.userService
          .loadUserFromStorage()
          .pipe(
            map((user) =>
              user
                ? UserActions.loadUserFromStorageSuccess({ user })
                : UserActions.logout()
            )
          )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.logout),
        tap(() => {
          this.userService.logout();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}
}
