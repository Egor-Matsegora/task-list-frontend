import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

@NgModule({
  declarations: [UserLayoutComponent, UserFormComponent, UserInfoComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
