import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { RegistrationComponent } from './components/registration/registration.component';



@NgModule({
  declarations: [LoginComponent, AuthComponent, RegistrationComponent],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
