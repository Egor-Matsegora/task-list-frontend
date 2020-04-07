import { handleHttpError } from '@helpers/handle-http-error';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class StatisticsService {
  private url: string = '/api/statistics/';

  constructor(private http: HttpClient) {}

  getStatistics(): Observable<any> {
    return this.http.get(`${this.url}`).pipe(catchError((error) => handleHttpError(error)));
  }
}
