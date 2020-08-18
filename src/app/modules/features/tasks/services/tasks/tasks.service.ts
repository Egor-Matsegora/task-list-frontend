import { handleHttpError } from '@helpers/handle-http-error';
import { catchError, map } from 'rxjs/operators';
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
    return this.http.get<Task[]>(this.url).pipe(map((response) => response));
  }

  createTask(task: { title: string; description?: string }): Observable<Task> {
    return this.http.post<Task>(this.url, task).pipe(map((response) => response));
  }

  updateTask(task): Observable<Task> {
    return this.http.patch<Task>(this.url + task._id, task).pipe(map((response) => response));
  }

  deleteTask(task): Observable<any> {
    return this.http.delete(this.url + task._id).pipe(map((response) => response));
  }

  deleteMultipleTasks(ids: string[]): Observable<any> {
    return this.http.post(this.url + 'delete_multiple', { ids });
  }
}
