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
import { LoginRequest } from '@interfaces/login-request.interface';

@Injectable()
export class AuthService {
  private url = 'http://localhost:5000/api/';
  private token: string = null;

  constructor(private http: HttpClient, private router: Router, private asideState: AsideStateService) {}

  login(user: LoginUser): Observable<LoginRequest> {
    return this.http.post<LoginRequest>(`${this.url}login`, user).pipe(
      map(req => {
        if (req && req.token) {
          localStorage.setItem('token', req.token);
          this.setToken(req.token);
          this.asideState.setDefaultState();
          return { success: req.success, user: req.user };
        }
        return { success: req.success, message: req.message };
      }),
      catchError(error => handleHttpError(error))
    );
  }

  registration(user: RegistretionUser): Observable<any> {
    return this.http.post(`${this.url}registration`, user).pipe(catchError(error => handleHttpError(error)));
  }

  setToken(token) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.removeItem('token');
    this.router.navigate(['']);
    this.asideState.removeAsideStorageState();
  }

  checkToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.setToken(token);
    }
  }
}
