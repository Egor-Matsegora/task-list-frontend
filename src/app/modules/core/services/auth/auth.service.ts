import { LocalStorageService } from './../local-storage/local-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// rxjs
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// services
import { AsideStateService } from '@core/services/aside-state/aside-state.service';
// helpers
import { handleHttpError } from '@helpers/handle-http-error';
// interfaces
import { RegistretionUser } from '@interfaces/registration-user.inerface';
import { LoginUser } from '@interfaces/login-user.interface';
import { LoginResponse } from '@interfaces/login-response.interface';

@Injectable()
export class AuthService {
  private url = '/api/';
  private token: string = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private asideState: AsideStateService,
    private localStorage: LocalStorageService
  ) {}

  login(user: LoginUser): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}login`, user).pipe(
      map((res) => {
        if (res && res.token) {
          this.localStorage.setItem('token', res.token);
          this.setToken(res.token);
          this.asideState.setDefaultState();
          return { success: res.success, user: res.user };
        }
        return { success: res.success, message: res.message };
      }),
      catchError((error) => handleHttpError(error))
    );
  }

  registration(user: RegistretionUser): Observable<any> {
    return this.http.post(`${this.url}registration`, user).pipe(catchError((error) => handleHttpError(error)));
  }

  setToken(token): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  logout() {
    this.localStorage.removeItem('token');
    this.setToken(null);
    this.router.navigate(['']);
    this.asideState.removeAsideStorageState();
  }

  checkToken() {
    const token = this.localStorage.getItem('token');

    token && this.setToken(token);
  }
}
