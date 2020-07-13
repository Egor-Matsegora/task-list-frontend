import { handleHttpError } from '@helpers/handle-http-error';
import { catchError } from 'rxjs/operators';
import { Task } from '@interfaces/task.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TasksService {
  private url: string = '/api/tasks/';
  // data subjects

  constructor(private http: HttpClient) {}

  // http methods
  getTasks(): Observable<Task[]> {
    return this.http.get<Task>(this.url).pipe(catchError((error) => handleHttpError(error)));
  }

  createTask(task: { title: string; description?: string }): Observable<Task> {
    return this.http.post<Task>(this.url, task).pipe(catchError((error) => handleHttpError(error)));
  }

  updateTask(task): Observable<Task> {
    return this.http.patch<Task>(this.url + task._id, task).pipe(catchError((error) => handleHttpError(error)));
  }

  deleteTask(task): Observable<any> {
    return this.http.delete(this.url + task._id).pipe(catchError((error) => handleHttpError(error)));
  }

  deleteMultipleTasks(ids: string[]): Observable<any> {
    return this.http.post(this.url + 'delete_multiple', { ids });
  }
}
