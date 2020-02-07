import { RegistretionUser } from './../../../../../interfaces/registration-user.inerface';
import { AuthService } from './../../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  formHeader: string = 'Регистрация';
  loading: boolean = false;
  form: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  replayPassword: FormControl;
  private user: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.initFormVars();
  }

  private initForm() {
    this.form = this.fb.group({
      user: this.fb.group({
        firstName: this.fb.control('', Validators.required),
        lastName: this.fb.control('', Validators.required),
        email: this.fb.control('', [Validators.required, Validators.email]),
        password: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
      }),
      replayPassword: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    });
  }

  private initFormVars() {
    this.user = this.form.get('user') as FormGroup;
    this.firstName = this.user.get('firstName') as FormControl;
    this.lastName = this.user.get('lastName') as FormControl;
    this.email = this.user.get('email') as FormControl;
    this.password = this.user.get('password') as FormControl;
    this.replayPassword = this.form.get('replayPassword') as FormControl;
    console.log(user, firstName, LastName, email, password, replayPassword);
  }

  registration(): void {
    if (this.form.valid) {
      console.log(this.user.value);
    }
  }
}
