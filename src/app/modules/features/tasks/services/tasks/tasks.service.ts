import { handleHttpError } from '@helpers/handle-http-error';
import { catchError, filter } from 'rxjs/operators';
import { Task } from '@interfaces/task.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class TasksService {
  private url: string = 'http://localhost:5000/api/tasks/';
  private taskState: BehaviorSubject<Task> = new BehaviorSubject(null);
  taskState$ = this.taskState.asObservable().pipe(filter(task => task !== null));

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task>(this.url).pipe(catchError(error => handleHttpError(error)));
  }

  createTask(task): Observable<Task> {
    return this.http.post<Task>(this.url, task).pipe(catchError(error => handleHttpError(error)));
  }

  updateTask(task): Observable<Task> {
    return this.http.patch<Task>(this.url + task._id, task).pipe(catchError(error => handleHttpError(error)));
  }

  deleteTask(task): Observable<any> {
    return this.http.delete(this.url + task._id).pipe(catchError(error => handleHttpError(error)));
  }

  updateTaskState(task) {
    this.taskState.next(task);
  }
}
