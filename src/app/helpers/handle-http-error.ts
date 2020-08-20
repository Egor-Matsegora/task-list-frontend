import { HttpErrorResponse } from '@angular/common/http';

export function handleHttpError(error: HttpErrorResponse): string {
  const errorMessage = error.error ? error.error.message || 'Что-то пошло не так' : error.message;
  console.error(errorMessage);
  return errorMessage;
}
