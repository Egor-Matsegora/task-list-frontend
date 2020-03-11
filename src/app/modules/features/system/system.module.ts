import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// modules
import { SharedModule } from '../../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
// components
import { SystemComponent } from './components/system/system.component';
import { AsideNavComponent } from './components/aside-nav/aside-nav.component';

@NgModule({
  declarations: [SystemComponent, AsideNavComponent],
  imports: [CommonModule, SystemRoutingModule, SharedModule]
})
export class SystemModule {}
