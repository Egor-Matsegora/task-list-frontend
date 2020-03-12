import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// modules
import { LayoutRoutingModule } from './layout-routing.module';
import { AuthModule } from './../auth/auth.module';
// components
import { LayoutComponent } from './layouts/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent],
  imports: [CommonModule, LayoutRoutingModule, SharedModule, AuthModule]
})
export class LayoutModule {}
