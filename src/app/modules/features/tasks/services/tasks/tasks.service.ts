import { handleHttpError } from '@helpers/handle-http-error';
import { catchError } from 'rxjs/operators';
import { Task } from '@interfaces/task.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private url: string = 'http://localhost:5000/api/';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task>(this.url).pipe(catchError(error => handleHttpError(error)));
  }
}
