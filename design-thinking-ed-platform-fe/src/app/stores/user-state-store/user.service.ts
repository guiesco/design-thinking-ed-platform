import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginData, IUser } from 'src/app/common/interfaces/user.interface';

@Injectable()
export class UserService {
  api = 'http://localhost:3000';
  constructor(private readonly http: HttpClient) {}

  login(loginParams: ILoginData): Observable<IUser> {
    return this.http.post<IUser>(this.api + '/user/login', loginParams);
  }
}
