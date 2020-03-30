import { RouterTestingModule } from '@angular/router/testing';
import { AsideStateService } from './../aside-state/aside-state.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';

// import { LayoutComponent } from '@features/layout/layouts/layout/layout.component';

let authService: AuthService;
let asideStateSpy: any;
let httpTestingController: HttpTestingController;

describe('AuthService', () => {
  beforeEach(() => {
    asideStateSpy = jasmine.createSpyObj('AsideStateService', ['setDefaultState', 'removeAsideStorageState']);
    // routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        AuthService,
        // { provide: Router, useValue: routerSpy },
        { provide: AsideStateService, useValue: asideStateSpy }
      ]
    });

    authService = TestBed.get(AuthService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  // constructor
  it('should be created and create aside state service instance', () => {
    expect(authService).toBeTruthy();
    expect(asideStateSpy).toBeTruthy();
  });

  // login()
  xit('should login and returns user, success status and token', () => {});
});
