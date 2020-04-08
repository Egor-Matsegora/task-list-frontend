import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Statistics } from '@app/interfaces/statistics.interface';
import { handleHttpError } from '@helpers/handle-http-error';

@Injectable()
export class StatisticsService {
  private url: string = '/api/statistics/';

  constructor(private http: HttpClient) {}

  getStatistics(): Observable<Statistics> {
    return this.http.get<Statistics>(this.url).pipe(catchError((error) => handleHttpError(error)));
  }
}
