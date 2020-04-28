import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserPasswordChangeComponent } from './components/user-password-change/user-password-change.component';
import { UserNameChangeComponent } from './components/user-name-change/user-name-change.component';
import { UserEmailChangeComponent } from './components/user-email-change/user-email-change.component';

@NgModule({
  declarations: [UserLayoutComponent, UserFormComponent, UserInfoComponent, UserPasswordChangeComponent, UserNameChangeComponent, UserEmailChangeComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
