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
import { RegistrationUser } from '@interfaces/registration-user.inerface';
import { LoginRequest } from '@app/interfaces/login-request.interface';
import { LoginResponse } from '@app/interfaces/login-response.interface';

@Injectable()
export class AuthService {
  private url = '/api/';
  private token: string = null;

  constructor(private http: HttpClient, private router: Router, private asideState: AsideStateService) {}

  login(user: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}login`, user).pipe(
      map((res) => {
        this.asideState.setDefaultState();
        return {
          token: res.token,
          user: res.user,
        };
      })
    );
  }

  registration(user: RegistrationUser): Observable<any> {
    return this.http.post(`${this.url}registration`, user).pipe(map((response) => response));
  }
}
