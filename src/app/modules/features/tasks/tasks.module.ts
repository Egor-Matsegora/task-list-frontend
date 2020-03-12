import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksLayoutComponent } from './layouts/tasks-layout/tasks-layout.component';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [TasksLayoutComponent],
  imports: [CommonModule, TasksRoutingModule, SharedModule]
})
export class TasksModule {}
