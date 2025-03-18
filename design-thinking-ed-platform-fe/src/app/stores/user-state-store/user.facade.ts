import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from './user.actions';
import * as selectors from './user.selectors';
import { AppState } from '../app-state-store/app.model';
import {
  ILoginData,
  IRegisterData,
  IUser,
} from 'src/app/common/interfaces/user.interface';

@Injectable()
export class UserFacade {
  constructor(private readonly store: Store<AppState>) {
    this.loadUserFromStorage();
  }

  user$ = this.store.select(selectors.selectUser);
  loading$ = this.store.select(selectors.selectLoading);
  error$ = this.store.select(selectors.selectError);

  login(loginData: ILoginData): void {
    this.store.dispatch(actions.login({ loginData }));
  }

  register(registerData: IRegisterData): void {
    this.store.dispatch(actions.register({ registerData }));
  }

  joinGroup(userId: string, groupId: string): void {
    this.update(userId, { group: { id: groupId } });
  }

  private update(id: string, user: Partial<IUser>): void {
    this.store.dispatch(actions.update({ id, user }));
  }

  logout(): void {
    this.store.dispatch(actions.logout());
  }

  private loadUserFromStorage(): void {
    this.store.dispatch(actions.loadUserFromStorage());
  }
}
