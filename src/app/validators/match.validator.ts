import { AbstractControl, ValidationErrors } from '@angular/forms';

export function match(matcher: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    return matcher.toLowerCase() === control.value.toLowerCase() ? { match: true } : null;
  };
}
