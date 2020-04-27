import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '@interfaces/user.interface';
import { handleHttpError } from '@helpers/handle-http-error';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = '/api';

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<User> {
    return this.http.get<User>(this.url + '/getuserinfo').pipe(catchError((error) => handleHttpError(error)));
  }
}
