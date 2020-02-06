import { LoginUser } from './../../../interfaces/loginUser.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private url = 'http://localhost:5000/auth/';

  constructor(private http: HttpClient) {}

  login(user: LoginUser): Observable<string> {
    return this.http.post<string>(`${this.url}login`, user).pipe(
      tap(token => {
        if (token) {
          console.log(token);
        }
      })
    );
  }
}
