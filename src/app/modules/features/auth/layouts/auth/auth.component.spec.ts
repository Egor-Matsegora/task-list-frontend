import { Location } from '@angular/common';
import { Routes, Router } from '@angular/router';

import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { LogoComponent } from '@shared/ui-kit/components/logo/logo.component';

import { Component } from '@angular/core';

@Component({
  template: `login`,
})
class LoginComponent {}

@Component({
  template: `registration`,
})
class RegistrationComponent {}

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
];

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [AuthComponent, LogoComponent, LoginComponent, RegistrationComponent],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AuthComponent);
        component = fixture.componentInstance;
        router = TestBed.get(Router);
        location = TestBed.get(Location);
        router.initialNavigation();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "login" when path is epty string', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/login', 'inavalid path');
  }));

  it('should navigate to "registration" when path is registration', fakeAsync(() => {
    router.navigate(['registration']);
    tick();
    expect(location.path()).toBe('/registration', 'inavalid path');
  }));

  afterEach(() => {
    fixture.destroy();
  });
});
