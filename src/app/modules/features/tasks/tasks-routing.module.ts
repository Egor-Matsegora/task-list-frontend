import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// componeets
import { TasksLayoutComponent } from './layouts/tasks-layout/tasks-layout.component';

const routes: Routes = [{ path: '', component: TasksLayoutComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}
