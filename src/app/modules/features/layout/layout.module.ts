import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// modules
import { LayoutRoutingModule } from './layout-routing.module';
// components
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent],
  imports: [CommonModule, LayoutRoutingModule, SharedModule]
})
export class LayoutModule {}
