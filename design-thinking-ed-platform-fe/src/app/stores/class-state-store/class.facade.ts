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
  constructor(private readonly store: Store<AppState>) {}

  classes$: Observable<IClass[] | null> = this.store.pipe(
    select(selectors.classSelector)
  );

  selectedClass$: Observable<IClass | null> = this.store.pipe(
    select(selectors.selectedClassSelector)
  );

  loading$: Observable<boolean> = this.store.pipe(
    select(selectors.classLoadingSelector)
  );

  error$: Observable<string | null> = this.store.pipe(
    select(selectors.classErrorSelector)
  );

  create(payload: ICreateClass) {
    this.store.dispatch(actions.create(payload));
  }

  findAll() {
    this.store.dispatch(actions.findAll());
  }

  loadClasses(userId: number, skip: number, take: number) {
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

  findOne(id: string) {
    this.store.dispatch(actions.findOne(id));
  }
}
