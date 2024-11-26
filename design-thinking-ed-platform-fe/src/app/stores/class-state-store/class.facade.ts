import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as actions from './class.actions';
import * as selectors from './class.selectors';
import { AppState } from '../app-state-store/app.model';
import { IClass, ICreateClass } from '../../common/interfaces/class.interface';

import { Observable } from 'rxjs';

@Injectable()
export class ClassFacade {
  constructor(private readonly store: Store<AppState>) { }

  class$: Observable<IClass[] | null> = this.store.pipe(
    select(selectors.classSelector)
  );

  createClass(payload: ICreateClass) {
    this.store.dispatch(actions.createClass(payload));
  }

  fetchClasses() {
    this.store.dispatch(actions.fetchClasses());
  }
}
