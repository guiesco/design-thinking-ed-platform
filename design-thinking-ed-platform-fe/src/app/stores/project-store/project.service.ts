import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ICreateGroup,
  IFindGroup,
  IGroup,
} from 'src/app/common/interfaces/group.interface';

@Injectable()
export class GroupService {
  api = 'http://localhost:3000'; //todo: add to env
  constructor(private readonly http: HttpClient) {}

  create(createObject: ICreateGroup): Observable<IGroup> {
    return this.http.post<IGroup>(this.api + '/group', createObject);
  }

  findAll(): Observable<IGroup[]> {
    return this.http.get<IGroup[]>(this.api + '/group');
  }

  find(findClassDto: IFindGroup) {
    return this.http.post<IGroup[]>(this.api + '/group/find', findClassDto);
  }

  delete(id: string) {
    return this.http.delete<IGroup>(this.api + '/group/' + id);
  }

  update(id: string, group: Partial<IGroup>) {
    return this.http.patch<IGroup>(this.api + '/group/' + id, group);
  }
}
