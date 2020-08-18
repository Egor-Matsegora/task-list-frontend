import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { User } from '@interfaces/user.interface';
import { handleHttpError } from '@helpers/handle-http-error';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = '/api';
  private userUpdateState: BehaviorSubject<User> = new BehaviorSubject(null);
  userUpdateState$ = this.userUpdateState.asObservable().pipe(filter((user) => user !== null));

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<User> {
    return this.http.get<User>(this.url + '/getuserinfo').pipe(map((response) => response));
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.url}/updateuser`, user).pipe(map((response) => response));
  }

  dispatchUserUpdateState(user: User) {
    this.userUpdateState.next(user);
  }

  updatePassword(password: string): Observable<any> {
    return this.http.patch(`${this.url}/updatepassword`, { password }).pipe(map((response) => response));
  }

  updateImage(image: File): Observable<User> {
    const data = new FormData();
    data.append('image', image, image.name);
    return this.http.patch<User>(this.url + '/updateuserimage', data);
  }
}
