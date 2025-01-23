import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './group.actions';
import { GroupService } from './group.service';
import { ICreateGroup } from 'src/app/common/interfaces/group.interface';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class GroupEffects {
  constructor(
    private readonly router: Router,
    private readonly actions$: Actions,
    private readonly groupService: GroupService // private readonly toastService: ToastService, // private readonly translatePipe: TranslatePipe,
  ) {}

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.create),
      exhaustMap(({ payload }: { payload: ICreateGroup }) =>
        this.groupService.create(payload).pipe(
          map((data) => actions.createSuccess(data)),
          catchError((error) => of(actions.createError(error)))
        )
      )
    )
  );

  find$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.find),
      exhaustMap(({ query }) =>
        this.groupService.find(query).pipe(
          map((data) => actions.findSuccess(data)),
          catchError((error) => of(actions.findError(error)))
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.update),
      exhaustMap(({ groupId, group }) =>
        this.groupService.update(groupId, group).pipe(
          map((data) => actions.updateSuccess(data)),
          catchError((error) => of(actions.updateError(error)))
        )
      )
    )
  );
}
