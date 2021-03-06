import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, catchError, switchMap, debounceTime } from 'rxjs/operators';

@Injectable()
export class ExistingPasswordValidator implements AsyncValidator {
  constructor(private http: HttpClient) {}

  private url: string = '/api/getuserpassword';

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return timer(100).pipe(
      debounceTime(50),
      switchMap(() => this.http.post(this.url, { password: `${control.value}` })),
      map((res: any) => (res.success ? null : { existingPassword: true })),
      catchError(() => of(null))
    );
  }
}
