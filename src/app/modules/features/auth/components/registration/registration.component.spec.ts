import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Location } from '@angular/common';
import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';

import { SharedModule } from '@app/modules/shared/shared.module';

import { RegistrationComponent } from './registration.component';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@core/services/auth/auth.service';

import { ExistingEmailValidator } from '@app/validators/existing-email.validator';
import { of } from 'rxjs';

fdescribe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let element: DebugElement;
  let toastr: any;
  let authService: any;
  let existingEmailValidator: ExistingEmailValidator;
  let location: Location;

  function setErrorMessage() {
    return element.queryAll(By.css('.control__error-text'));
  }

  beforeEach(async(() => {
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['registration']);
    const existingEmailValidatorSpy = jasmine.createSpyObj('ExistingEmailValidator', ['validate']);

    TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [RegistrationComponent],
      providers: [
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ExistingEmailValidator, useValue: existingEmailValidatorSpy },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RegistrationComponent);
        toastr = TestBed.get(ToastrService);
        authService = TestBed.get(AuthService);
        existingEmailValidator = TestBed.get(ExistingEmailValidator);
        component = fixture.componentInstance;
        element = fixture.debugElement;
        location = TestBed.get(Location);
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const emailInput = element.query(By.css('#firstName'));
    const firstNameInput = element.query(By.css('#firstName'));
    const lastNameInput = element.query(By.css('#lastName'));
    const passwordInput = element.query(By.css('#registration-password'));
    const passwordReplayInput = element.query(By.css('#confirm-password'));

    expect(emailInput).toBeTruthy();
    expect(firstNameInput).toBeTruthy();
    expect(lastNameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(passwordReplayInput).toBeTruthy();
  });

  it('should create input variables', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.form).toBeTruthy();
    expect(component.firstName).toBeTruthy();
    expect(component.lastName).toBeTruthy();
    expect(component.password).toBeTruthy();
    expect(component.replayPassword).toBeTruthy();
  });

  it('should disable submit button when form is invalid', () => {
    component.ngOnInit();
    component.form.setValue({
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      replayPassword: '',
    });
    component.form.updateValueAndValidity();
    fixture.detectChanges();
    const disabledButton = element.query(By.css('button[disabled]'));
    expect(component.form.invalid).toBeTruthy();
    expect(disabledButton).toBeTruthy();
  });

  it('should validate first name control', () => {
    let errorMessage;
    component.ngOnInit();
    fixture.detectChanges();
    const firstNameControl = component.firstName;
    // невалидная форма при инициализации
    expect(firstNameControl.invalid).toBeTruthy();
    expect(firstNameControl.errors.required).toBeTruthy();
    // отображение ошибки если поле пустое
    firstNameControl.markAsTouched();
    fixture.detectChanges();
    errorMessage = setErrorMessage();
    expect(errorMessage.length).toBe(1);
    expect(errorMessage[0].nativeElement.innerText).toContain('поле не должно быть пустым');
    // поле валидно если данные введены, ошибка не отображается
    firstNameControl.setValue('name');
    fixture.detectChanges();
    errorMessage = setErrorMessage();
    expect(errorMessage.length).toBe(0);
    expect(firstNameControl.invalid).toBeFalsy();
  });

  it('should validate last name control', () => {
    let errorMessage;
    component.ngOnInit();
    fixture.detectChanges();
    const lastNameControl = component.firstName;
    // невалидная форма при инициализации
    expect(lastNameControl.invalid).toBeTruthy();
    expect(lastNameControl.errors.required).toBeTruthy();
    // отображение ошибки если поле пустое
    lastNameControl.markAsTouched();
    fixture.detectChanges();
    errorMessage = setErrorMessage();
    expect(errorMessage.length).toBe(1);
    expect(errorMessage[0].nativeElement.innerText).toContain('поле не должно быть пустым');
    // поле валидно если данные введены корректно, ошибка не отображается
    lastNameControl.setValue('name');
    fixture.detectChanges();
    errorMessage = setErrorMessage();
    expect(errorMessage.length).toBe(0);
    expect(lastNameControl.invalid).toBeFalsy();
  });

  it('should validate email control', () => {
    let errorMessage;
    component.ngOnInit();
    fixture.detectChanges();
    const emailControl = component.email;
    // невалидная форма при инициализации
    expect(emailControl.invalid).toBeTruthy();
    expect(emailControl.errors.required).toBeTruthy();
    // отображение ошибки если поле пустое
    emailControl.markAsTouched();
    fixture.detectChanges();
    errorMessage = setErrorMessage();
    expect(emailControl.errors.required).toBeTruthy();
    expect(errorMessage.length).toBe(1);
    expect(errorMessage[0].nativeElement.innerText).toContain('поле не должно быть пустым');
    // отображение ошибки если введены некорректные данные
    emailControl.setValue('somevalue');
    fixture.detectChanges();
    errorMessage = setErrorMessage();
    expect(emailControl.errors.email).toBeTruthy();
    expect(errorMessage.length).toBe(1);
    expect(errorMessage[0].nativeElement.innerText).toContain('поле должно содержать e-mail');
    // поле валидно если данные введены, ошибка не отображается
    emailControl.setValue('example@email.com');
    fixture.detectChanges();
    errorMessage = setErrorMessage();
    expect(errorMessage.length).toBe(0);
    expect(emailControl.invalid).toBeFalsy();
  });

  it('should validate password control', () => {
    let errorMessage;
    component.ngOnInit();
    fixture.detectChanges();
    const passwordControl = component.password;
    // невалидная форма при инициализации
    expect(passwordControl.invalid).toBeTruthy();
    expect(passwordControl.errors.required).toBeTruthy();
    // отображение ошибки если поле пустое
    passwordControl.markAsTouched();
    fixture.detectChanges();
    errorMessage = setErrorMessage();
    expect(passwordControl.errors.required).toBeTruthy();
    expect(errorMessage.length).toBe(1);
    expect(errorMessage[0].nativeElement.innerText).toContain('поле не должно быть пустым');
    // отображение ошибки если введены некорректные данные
    passwordControl.setValue('short');
    fixture.detectChanges();
    errorMessage = setErrorMessage();
    expect(passwordControl.errors.minlength).toBeTruthy();
    expect(errorMessage.length).toBe(1);
    passwordControl.setValue('longlonglonglongpasswordforexamle');
    fixture.detectChanges();
    errorMessage = setErrorMessage();
    expect(passwordControl.errors.maxlength).toBeTruthy();
    expect(errorMessage.length).toBe(1);
    // поле валидно если данные введены, ошибка не отображается
    passwordControl.setValue('password123');
    fixture.detectChanges();
    errorMessage = setErrorMessage();
    expect(errorMessage.length).toBe(0);
    expect(passwordControl.invalid).toBeFalsy();
  });

  it('should validate replay password control', () => {
    let errorMessage;
    component.ngOnInit();
    fixture.detectChanges();
    const replayPasswordControl = component.password;
    // невалидная форма при инициализации
    expect(replayPasswordControl.invalid).toBeTruthy();
    expect(replayPasswordControl.errors.required).toBeTruthy();
    // отображение ошибки если поле пустое
    replayPasswordControl.markAsTouched();
    fixture.detectChanges();
    errorMessage = setErrorMessage();
    expect(replayPasswordControl.errors.required).toBeTruthy();
    expect(errorMessage.length).toBe(1);
    expect(errorMessage[0].nativeElement.innerText).toContain('поле не должно быть пустым');
    // отображение ошибки если введены некорректные данные
    replayPasswordControl.setValue('short');
    fixture.detectChanges();
    errorMessage = setErrorMessage();
    expect(replayPasswordControl.errors.minlength).toBeTruthy();
    expect(errorMessage.length).toBe(1);
    replayPasswordControl.setValue('longlonglonglongpasswordforexamle');
    fixture.detectChanges();
    errorMessage = setErrorMessage();
    expect(replayPasswordControl.errors.maxlength).toBeTruthy();
    expect(errorMessage.length).toBe(1);
    // поле валидно если данные введены, ошибка не отображается
    replayPasswordControl.setValue('password123');
    fixture.detectChanges();
    errorMessage = setErrorMessage();
    expect(errorMessage.length).toBe(0);
    expect(replayPasswordControl.invalid).toBeFalsy();
  });

  it('should disable replay password control if password control has no value', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const passwordControl = component.password;
    const replayPasswordControl = component.replayPassword;
    expect(replayPasswordControl.disabled).toBeTruthy();
    passwordControl.setValue('somevalue');
    fixture.detectChanges();
    expect(replayPasswordControl.disabled).toBeFalsy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
