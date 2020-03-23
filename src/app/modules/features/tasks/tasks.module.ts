import { TasksService } from './services/tasks/tasks.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksLayoutComponent } from './layouts/tasks-layout/tasks-layout.component';
import { SharedModule } from './../../shared/shared.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskComponent } from './components/task/task.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TasksHeaderComponent } from './components/tasks-header/tasks-header.component';
import { TaskActionsComponent } from './components/task-actions/task-actions.component';

@NgModule({
  declarations: [TasksLayoutComponent, TaskListComponent, TaskComponent, TaskFormComponent, TasksHeaderComponent, TaskActionsComponent],
  imports: [CommonModule, TasksRoutingModule, SharedModule],
  providers: [TasksService]
})
export class TasksModule {}
