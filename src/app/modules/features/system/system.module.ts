import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// modules
import { SharedModule } from '../../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
// components
import { AsideNavComponent } from './components/aside-nav/aside-nav.component';
import { SystemLayoutComponent } from './layouts/system-layout/system-layout.component';

@NgModule({
  declarations: [AsideNavComponent, SystemLayoutComponent],
  imports: [CommonModule, SystemRoutingModule]
})
export class SystemModule {}
