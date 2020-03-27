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
  private deleteTaskState: BehaviorSubject<Task> = new BehaviorSubject(null);
  private deleteDoneTasksState: BehaviorSubject<boolean> = new BehaviorSubject(false);
  updateTaskState$: Observable<Task> = this.updateTaskState.asObservable().pipe(filter(task => task !== null));
  addTaskState$: Observable<Task> = this.addTaskState.asObservable().pipe(filter(task => task !== null));
  deleteTaskState$: Observable<Task> = this.deleteTaskState.asObservable().pipe(filter(task => task !== null));
  deleteDoneTasksState$: Observable<boolean> = this.deleteDoneTasksState.asObservable().pipe(filter(action => action));

  constructor(private http: HttpClient) {}

  // data methods
  addTaskAction(task: Task) {
    this.addTaskState.next(task);
  }

  updateTaskAction(task: Task) {
    this.updateTaskState.next(task);
  }

  deleteTaskAction(task: Task) {
    this.deleteTaskState.next(task);
  }

  deleteDoneTasksAction() {
    this.deleteDoneTasksState.next(true);
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
