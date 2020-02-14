import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { SystemComponent } from '../system/components/system/system.component';

@NgModule({
  declarations: [LayoutComponent, SystemComponent],
  imports: [CommonModule, LayoutRoutingModule, SharedModule]
})
export class LayoutModule {}
