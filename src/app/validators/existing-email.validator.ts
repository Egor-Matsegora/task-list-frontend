import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class ExistingEmailValidator implements AsyncValidator {
  constructor(private http: HttpClient) {}

  private url: string = 'http://localhost:5000/api/getuser';

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return timer(250).pipe(
      switchMap(() => this.http.post(this.url, { email: `${control.value}` })),
      map((res: any) => (res.success ? { existingEmail: true } : null)),
      catchError(() => of(null))
    );
  }
}
