import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as actions from './user.actions';
import * as selectors from './user.selectors';
import { AppState } from '../app-state-store/app.model';
import { ILoginData, IUser } from 'src/app/common/interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable()
export class UserFacade {
  constructor(private readonly store: Store<AppState>) {}

  user$: Observable<IUser | null> = this.store.pipe(
    select(selectors.userSelector)
  );

  login(payload: ILoginData) {
    this.store.dispatch(actions.login(payload));
  }
}
