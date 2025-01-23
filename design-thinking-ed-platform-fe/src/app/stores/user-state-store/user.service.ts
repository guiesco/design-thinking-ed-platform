import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ILoginData,
  IRegisterData,
  IUser,
} from 'src/app/common/interfaces/user.interface';

@Injectable()
export class UserService {
  api = 'http://localhost:3000'; //todo: add to env
  constructor(private readonly http: HttpClient) {}

  login(loginParams: ILoginData): Observable<IUser[]> {
    return this.http.post<IUser[]>(this.api + '/user/login', loginParams);
  }

  register(registerParams: IRegisterData): Observable<IUser> {
    return this.http.post<IUser>(this.api + '/user', registerParams);
  }

  update(id: string, user: Partial<IUser>) {
    return this.http.patch<IUser>(this.api + '/user/' + id, user);
  }
}
