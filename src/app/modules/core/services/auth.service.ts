import { LoginRequest } from './../../../interfaces/login-request.interface';
import { RegistretionUser } from './../../../interfaces/registration-user.inerface';
import { LoginUser } from '../../../interfaces/login-user.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { handleHttpError } from './../../../helpers/handle-http-error';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private url = 'http://localhost:5000/auth/';
  private token: string = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(user: LoginUser): Observable<LoginRequest> {
    return this.http.post<LoginRequest>(`${this.url}login`, user).pipe(
      map(req => {
        console.log(req);
        if (req && req.token) {
          localStorage.setItem('token', req.token);
          this.setToken(req.token);
          return { success: req.success };
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
  }
}
