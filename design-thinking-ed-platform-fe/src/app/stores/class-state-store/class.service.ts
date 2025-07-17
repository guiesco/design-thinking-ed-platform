import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IClass,
  ICreateClass,
  IFindClass,
} from 'src/app/common/interfaces/class.interface';

@Injectable()
export class ClassService {
  api = 'http://localhost:3000'; //todo: add to env
  constructor(private readonly http: HttpClient) {}

  create(createParams: ICreateClass): Observable<IClass> {
    return this.http.post<IClass>(this.api + '/class', createParams);
  }

  findAll(): Observable<IClass[]> {
    return this.http.get<IClass[]>(this.api + '/class');
  }

  find(findClassDto: IFindClass) {
    return this.http.post<IClass[]>(this.api + '/class/find', findClassDto);
  }

  deleteClass(id: string) {
    return this.http.delete<IClass>(this.api + '/class/' + id);
  }

  findOne(id: string): Observable<IClass> {
    return this.http.get<IClass>(this.api + '/class/' + id);
  }
}
