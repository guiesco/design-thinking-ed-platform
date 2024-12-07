import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IClass,
  ICreateClass,
} from 'src/app/common/interfaces/class.interface';
import { IUser } from 'src/app/common/interfaces/user.interface';

@Injectable()
export class ClassService {
  api = 'http://localhost:3000'; //todo: add to env
  constructor(private readonly http: HttpClient) {}

  createClass(createClassParams: ICreateClass): Observable<ICreateClass> {
    return this.http.post<ICreateClass>(this.api + '/class', createClassParams);
  }

  fetchClasses(): Observable<IClass[]> {
    return this.http.get<IClass[]>(this.api + '/class');
  }
}
