import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  ILoginData,
  IRegisterData,
  IUser,
} from 'src/app/common/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
  private readonly STORAGE_KEY = '@dtep:user';
  private apiUrl = `${environment.apiUrl}/user`;

  constructor(private readonly http: HttpClient) {}

  login(loginParams: ILoginData): Observable<IUser[]> {
    return this.http.post<IUser[]>(`${this.apiUrl}/login`, loginParams).pipe(
      tap(([user]) => {
        if (user) {
          this.saveUserToStorage(user);
        }
      })
    );
  }

  register(registerParams: IRegisterData): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, registerParams).pipe(
      tap((user) => {
        if (user) {
          this.saveUserToStorage(user);
        }
      })
    );
  }

  update(id: string, user: Partial<IUser>): Observable<IUser> {
    return this.http.patch<IUser>(`${this.apiUrl}/${id}`, user).pipe(
      tap((updatedUser) => {
        if (updatedUser) {
          this.saveUserToStorage(updatedUser);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  loadUserFromStorage(): Observable<IUser | null> {
    const storedUser = localStorage.getItem(this.STORAGE_KEY);
    if (storedUser) {
      return of(JSON.parse(storedUser));
    }
    return of(null);
  }

  private saveUserToStorage(user: IUser): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }
}
