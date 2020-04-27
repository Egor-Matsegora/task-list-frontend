import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = '/api';

  constructor(private http: HttpClient) {}

  // getUserInfo(): Observable<User> {
  //   return this.http.get()
  // }
}
