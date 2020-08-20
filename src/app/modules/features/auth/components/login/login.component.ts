import { clearAuthMessageAction } from './../../store/actions/auth.actions';
import { mergeMap, filter } from 'rxjs/operators';
import { getAuthLoading, getAuthError, getAuthMessage } from './../../store/state/auth.state';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginActions } from '../../store/actions';
import { Observable, Subscription, empty } from 'rxjs';
import { clearAuthErrorAction } from '../../store/actions/auth.actions';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  formHeader: string = 'Вход';
  loading$: Observable<boolean>;
  form: FormGroup;
  email: FormControl;
  password: FormControl;
  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private store: Store, private toastr: ToastrService) {}

  ngOnInit() {
    this.initStoreValues();
    this.initForm();
    this.initFormVars();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private initStoreValues() {
    this.loading$ = this.store.select(getAuthLoading);
    const errorStoreSub = this.store
      .pipe(
        select(getAuthError),
        filter((error) => error !== null),
        mergeMap((error) => (error ? this.toastr.error(error).onHidden : empty()))
      )
      .subscribe(() => this.store.dispatch(clearAuthErrorAction()));
    const messageStoreSub = this.store
      .pipe(
        select(getAuthMessage),
        filter((message) => !!message),
        mergeMap((message) => (message ? this.toastr.info(message).onHidden : empty()))
      )
      .subscribe(() => this.store.dispatch(clearAuthMessageAction()));
    this.subscriptions.add(errorStoreSub);
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.email, Validators.required]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    });
  }

  private initFormVars(): void {
    this.email = this.form.get('email') as FormControl;
    this.password = this.form.get('password') as FormControl;
  }

  login() {
    if (this.form.valid) {
      this.store.dispatch(LoginActions.loginAction({ request: this.form.value }));
    }
  }
}
