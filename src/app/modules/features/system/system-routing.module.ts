import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// components
import { SystemLayoutComponent } from './layouts/system-layout/system-layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
    path: '',
    component: SystemLayoutComponent,
    children: [
      { path: 'notes', loadChildren: () => import('../notes/notes.module').then(m => m.NotesModule) },
      { path: 'tasks', loadChildren: () => import('../tasks/tasks.module').then(m => m.TasksModule) },
      { path: 'scheduler', loadChildren: () => import('../scheduler/scheduler.module').then(m => m.SchedulerModule) },
      {
        path: 'statistics',
        loadChildren: () => import('../statistics/statistics.module').then(m => m.StatisticsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
