import { RouterTestingModule } from '@angular/router/testing';
import { AsideStateService } from './../aside-state/aside-state.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';

let authService: AuthService;
let asideStateSpy: any;
let httpTestingController: HttpTestingController;
let router: any;

describe('AuthService', () => {
  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    asideStateSpy = jasmine.createSpyObj('AsideStateService', ['setDefaultState', 'removeAsideStorageState']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        AuthService,
        { provide: AsideStateService, useValue: asideStateSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    authService = TestBed.get(AuthService);
    httpTestingController = TestBed.get(HttpTestingController);
    router = TestBed.get(Router);
  });

  // constructor
  it('should be created and create aside state service instance', () => {
    expect(authService).toBeTruthy();
    expect(asideStateSpy).toBeTruthy();
  });

  // login()
  it('should login and returns user, success status and set token to localStorage', () => {
    const testUser = {
      email: 'test@email.com',
      password: '111111111'
    };

    const userResponseData = {
      token: 'Bearer someToken',
      success: true,
      user: {
        email: testUser.email,
        password: 'testhashpassword',
        firstName: 'first-name',
        lastName: 'last-name',
        imageUrl: ''
      }
    };

    spyOn(localStorage, 'setItem').withArgs('token', 'Bearer someToken');

    authService.login(testUser).subscribe(response => {
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(asideStateSpy.setDefaultState).toHaveBeenCalledTimes(1);
      expect(response).toBeTruthy('no user returned');
      expect(response.user.email).toEqual(testUser.email);
    });

    const request = httpTestingController.expectOne('http://localhost:5000/api/login');
    expect(request.request.method).toEqual('POST');
    request.flush(userResponseData);
  });

  // login with wrong password
  it('should returns sucess: false and wrong password message, when password is wrong', () => {
    const wrongUser = {
      email: 'test@email.com',
      password: '111111111'
    };

    const wrongUserResponseData = {
      success: false,
      message: 'wrong password'
    };

    spyOn(localStorage, 'setItem');
    spyOn(console, 'error');

    authService.login(wrongUser).subscribe(
      response => {
        expect(response).toBeTruthy('no response returned');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
        expect(asideStateSpy.setDefaultState).toHaveBeenCalledTimes(0);
        expect(response.success).toBeFalsy('wrong success value');
        expect(response.message).toEqual(wrongUserResponseData.message);
      },
      error => {
        expect(console.error).toHaveBeenCalled();
        expect(error).toEqual(wrongUserResponseData.message);
      }
    );

    const request = httpTestingController.expectOne('http://localhost:5000/api/login');
    expect(request.request.method).toEqual('POST');
    request.flush(wrongUserResponseData, { status: 401, statusText: 'Unaftorized' });
  });

  // registration()
  it('should return succes: true when user registered', () => {
    const registrationUser = {
      email: 'test@email.com',
      password: '111111111',
      firstName: 'John',
      lastName: 'Doe'
    };

    authService.registration(registrationUser).subscribe(response => {
      expect(response).toBeTruthy();
      expect(response.success).toBeTruthy();
    });

    const request = httpTestingController.expectOne('http://localhost:5000/api/registration');
    expect(request.request.method).toEqual('POST');
    request.flush({ success: true });
  });

  // logout
  it('should remove token and asideState keys from localStorage and navigate to start page', () => {
    spyOn(localStorage, 'removeItem').withArgs('token');

    authService.logout();

    expect(asideStateSpy.removeAsideStorageState).toHaveBeenCalledTimes(1);
    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
