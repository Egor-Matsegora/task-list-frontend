import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription, Observable, empty } from 'rxjs';
import { switchMap, filter, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { passwordMatchValidator } from '@validators/replay-password.validator';
import { ExistingEmailValidator } from '@validators/existing-email.validator';
import { getAuthLoading, getAuthError, getAuthMessage } from './../../store/state/auth.state';
import { AuthActions, RegistrationActions } from '../../store/actions';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [ExistingEmailValidator],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  formHeader: string = 'Регистрация';
  loading$: Observable<boolean>;
  form: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  replayPassword: FormControl;
  private user: FormGroup;
  subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private existingEmailValidator: ExistingEmailValidator,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initStoreVariables();
    this.initForm();
    this.initFormVars();
    this.replayPasswordChangeAcces();
  }

  ngOnDestroy() {
    this.subscriptions && this.subscriptions.unsubscribe();
  }

  private initStoreVariables() {
    this.loading$ = this.store.select(getAuthLoading);
    const errorStoreSub = this.store
      .pipe(
        select(getAuthError),
        filter((error) => !!error),
        switchMap((error) => (error ? this.toastr.error(error).onHidden : empty()))
      )
      .subscribe(() => this.store.dispatch(AuthActions.clearAuthErrorAction()));
    const messageStoreSub = this.store
      .pipe(
        select(getAuthMessage),
        filter((message) => !!message),
        switchMap((message) => (message ? this.toastr.info(message).onHidden : empty()))
      )
      .subscribe(() => this.store.dispatch(AuthActions.clearAuthMessageAction()));
    this.subscriptions.add(errorStoreSub).add(messageStoreSub);
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

  registration(): void {
    if (this.form.valid) {
      this.store.dispatch(RegistrationActions.registrationAction({ user: this.user.value }));
    }
  }
}
