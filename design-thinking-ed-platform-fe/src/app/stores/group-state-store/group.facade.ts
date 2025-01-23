import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as actions from './group.actions';
import * as selectors from './group.selectors';
import { AppState } from '../app-state-store/app.model';
import {
  ICreateGroup,
  IFindGroup,
  IGroup,
} from 'src/app/common/interfaces/group.interface';
import { Observable } from 'rxjs';

@Injectable()
export class GroupFacade {
  constructor(private readonly store: Store<AppState>) {}

  groups$: Observable<IGroup[]> = this.store.pipe(
    select(selectors.groupSelector)
  );

  create(payload: ICreateGroup) {
    this.store.dispatch(actions.create(payload));
  }

  loadGroups(classId: string, skip: number, take: number) {
    const findQuery: IFindGroup = {
      class: { id: classId },
      students: [],
      skip,
      take,
    };
    this.find(findQuery);
  }

  private update(groupId: string, group: Partial<IGroup>) {
    this.store.dispatch(actions.update(groupId, group));
  }

  private find(query: IFindGroup) {
    this.store.dispatch(actions.find(query));
  }
}
