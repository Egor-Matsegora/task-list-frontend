import { handleHttpError } from '@helpers/handle-http-error';
import { catchError, filter } from 'rxjs/operators';
import { Task } from '@interfaces/task.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class TasksService {
  private url: string = 'http://localhost:5000/api/tasks/';
  // data subjects
  private addTaskState: BehaviorSubject<Task> = new BehaviorSubject(null);
  private updateTaskState: BehaviorSubject<Task> = new BehaviorSubject(null);
  updateTaskState$ = this.updateTaskState.asObservable().pipe(filter(task => task !== null));
  addTaskState$ = this.addTaskState.asObservable().pipe(filter(task => task !== null));

  constructor(private http: HttpClient) {}

  // data methods
  addTaskAction(task) {
    this.addTaskState.next(task);
  }

  updateTaskAction(task) {
    this.updateTaskState.next(task);
  }

  // http methods
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
}
