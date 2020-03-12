import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [LoginComponent, AuthComponent, RegistrationComponent, LogoutComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule],
  exports: [LogoutComponent]
})
export class AuthModule {}
