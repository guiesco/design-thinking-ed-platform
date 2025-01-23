import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as actions from './user.actions';
import * as selectors from './user.selectors';
import { AppState } from '../app-state-store/app.model';
import {
  ILoginData,
  IRegisterData,
  IUser,
} from 'src/app/common/interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable()
export class UserFacade {
  constructor(private readonly store: Store<AppState>) {}

  user$: Observable<IUser> = this.store.pipe(select(selectors.userSelector));

  login(payload: ILoginData) {
    this.store.dispatch(actions.login(payload));
  }

  register(payload: IRegisterData) {
    this.store.dispatch(actions.register(payload));
  }

  joinGroup(userId: string, groupId: string) {
    this.update(userId, { group: { id: groupId } });
  }

  private update(userId: string, user: Partial<IUser>) {
    this.store.dispatch(actions.update(userId, user));
  }
}
