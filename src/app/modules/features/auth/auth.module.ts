import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LoginComponent, AuthComponent, RegistrationComponent],
  imports: [CommonModule, SharedModule /* AuthRoutingModule */],
  exports: [AuthComponent]
})
export class AuthModule {}
