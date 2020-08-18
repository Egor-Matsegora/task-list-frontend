import { HttpErrorResponse } from '@angular/common/http';

export function handleHttpError(error: HttpErrorResponse): string {
  const errorMessage = error.message || error.error.message || 'Что-то пошло не так';
  console.error(errorMessage);
  return errorMessage;
}
