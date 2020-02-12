import { AuthService } from './../../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formHeader: string = 'Вход';
  loading: boolean = false;
  form: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.initForm();
    this.initFormVars();
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.email, Validators.required]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    });
  }

  private initFormVars(): void {
    this.email = this.form.get('email') as FormControl;
    this.password = this.form.get('password') as FormControl;
  }

  login() {
    if (this.form.valid) {
      this.form.disable();
      this.loading = true;
      this.authService.login(this.form.value).subscribe(req => {
        if (req.success) {
          this.form.reset();
          this.loading = false;
          this.form.enable();
          this.router.navigate(['system']);
        } else {
          this.form.reset();
          this.loading = false;
          this.form.enable();
        }
      });
    }
  }
}
