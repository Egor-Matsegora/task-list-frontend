import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors {
  const replayPassword: string = control.get('replayPassword').value;
  const user: FormGroup = control.get('user') as FormGroup;
  const password: string = user.get('password').value;
  if (replayPassword !== password) {
    return {passwordMatch: true};
  }
  return null;
}
