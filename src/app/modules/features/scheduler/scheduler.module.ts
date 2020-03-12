import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerLayoutComponent } from './layouts/scheduler-layout/scheduler-layout.component';


@NgModule({
  declarations: [SchedulerLayoutComponent],
  imports: [
    CommonModule,
    SchedulerRoutingModule
  ]
})
export class SchedulerModule { }
