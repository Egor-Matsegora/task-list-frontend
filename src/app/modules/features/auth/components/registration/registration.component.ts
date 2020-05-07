import { ExistingEmailValidator } from '@validators/existing-email.validator';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { passwordMatchValidator } from 'src/app/validators/replay-password.validator';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [ExistingEmailValidator],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  formHeader: string = 'Регистрация';
  loading: boolean = false;
  form: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  replayPassword: FormControl;
  private user: FormGroup;
  subscriptions: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private existingEmailValidator: ExistingEmailValidator,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
    this.initFormVars();
    this.replayPasswordChangeAcces();
  }

  ngOnDestroy() {
    this.subscriptions && this.subscriptions.unsubscribe();
  }

  private initForm() {
    this.form = this.fb.group(
      {
        user: this.fb.group({
          firstName: this.fb.control('', Validators.required),
          lastName: this.fb.control('', Validators.required),
          email: this.fb.control(
            '',
            [Validators.required, Validators.email],
            this.existingEmailValidator.validate.bind(this.existingEmailValidator)
          ),
          password: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
        }),
        replayPassword: this.fb.control({ value: '', disabled: true }, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ]),
      },
      { validators: passwordMatchValidator }
    );
  }

  private initFormVars() {
    this.user = this.form.get('user') as FormGroup;
    this.firstName = this.user.get('firstName') as FormControl;
    this.lastName = this.user.get('lastName') as FormControl;
    this.email = this.user.get('email') as FormControl;
    this.password = this.user.get('password') as FormControl;
    this.replayPassword = this.form.get('replayPassword') as FormControl;
  }

  private replayPasswordChangeAcces() {
    this.subscriptions.add(
      this.password.valueChanges.subscribe((val) => {
        if (val) {
          this.replayPassword.enable();
        } else {
          this.replayPassword.reset();
          this.replayPassword.disable();
        }
      })
    );
  }

  private subToRegistration() {
    this.subscriptions.add(
      this.authService.registration(this.user.value).subscribe(
        (res) => {
          if (res && res.success) {
            this.toastr.success('Вы успешно зарегестрировались, можете войти');
            this.form.enable();
            this.form.reset();
            this.loading = false;
            this.router.navigate(['auth', 'login']);
          }
        },
        (err) => {
          this.toastr.error('Ошибка регистрации');
          this.form.enable();
          this.loading = false;
          console.error(err);
        }
      )
    );
  }

  registration(): void {
    if (this.form.valid) {
      this.form.disable();
      this.loading = true;
      this.subToRegistration();
    }
  }
}
