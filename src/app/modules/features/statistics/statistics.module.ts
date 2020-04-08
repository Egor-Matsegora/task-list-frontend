import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// modules
import { StatisticsRoutingModule } from './statistics-routing.module';
import { SharedModule } from '@shared/shared.module';
// components
import { StatisticsLayoutComponent } from './layouts/statistics-layout/statistics-layout.component';
import { NotesStatComponent } from './components/notes-stat/notes-stat.component';
import { TasksStatComponent } from './components/tasks-stat/tasks-stat.component';
// services
import { StatisticsService } from './services/statistics.service';

@NgModule({
  declarations: [StatisticsLayoutComponent, NotesStatComponent, TasksStatComponent],
  imports: [CommonModule, StatisticsRoutingModule, SharedModule],
  providers: [StatisticsService],
})
export class StatisticsModule {}
