import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as actions from './class.actions';
import * as selectors from './class.selectors';
import { AppState } from '../app-state-store/app.model';
import {
  IClass,
  ICreateClass,
  IFindClass,
} from '../../common/interfaces/class.interface';

import { Observable } from 'rxjs';

@Injectable()
export class ClassFacade {
  constructor(private readonly store: Store<AppState>) { }

  classes$: Observable<IClass[] | null> = this.store.pipe(
    select(selectors.classSelector)
  );

  create(payload: ICreateClass) {
    this.store.dispatch(actions.create(payload));
  }

  findAll() {
    this.store.dispatch(actions.findAll());
  }

  loadClasses(userId: string, skip: number, take: number) {
    const findQuery: IFindClass = {
      professor: { id: userId },
      skip,
      take,
    };
    this.find(findQuery);
  }

  private find(query: IFindClass) {
    this.store.dispatch(actions.find(query));
  }

  deleteClass(id: string) {
    this.store.dispatch(actions.deleteClass(id));
  }
}
