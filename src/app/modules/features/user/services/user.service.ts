import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
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
    return this.http.get<User>(this.url + '/getuserinfo').pipe(catchError((error) => handleHttpError(error)));
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.url}/updateuser`, user).pipe(catchError((error) => handleHttpError(error)));
  }

  dispatchUserUpdateState(user: User) {
    this.userUpdateState.next(user);
  }

  updatePassword(password: string): Observable<any> {
    return this.http
      .patch(`${this.url}/updatepassword`, { password })
      .pipe(catchError((error) => handleHttpError(error)));
  }

  updateImage(image: File): Observable<User> {
    const data = new FormData();
    data.append('image', image, image.name);
    return this.http.patch<User>(this.url + '/updateuserimage', data);
  }
}
