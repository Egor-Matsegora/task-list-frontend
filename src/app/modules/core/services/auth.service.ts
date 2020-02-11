import { RegistretionUser } from './../../../interfaces/registration-user.inerface';
import { LoginUser } from './../../../interfaces/loginUser.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { handleHttpError } from './../../../helpers/handle-http-error';

@Injectable()
export class AuthService {
  private url = 'http://localhost:5000/auth/';
  private token: { token: string } = null;

  constructor(private http: HttpClient) {}

  login(user: LoginUser): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.url}login`, user).pipe(
      tap(token => {
        if (token) {
          localStorage.setItem('token', token.token);
        }
      }),
      catchError(error => handleHttpError(error))
    );
  }

  registration(user: RegistretionUser): Observable<any> {
    return this.http.post(`${this.url}registration`, user).pipe(
      catchError(error => handleHttpError(error))
    );
  }

  setToken(token) {
    this.token = token;
  }

  getToken(): { token: string } {
    return this.token;
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.removeItem('token');
  }
}
