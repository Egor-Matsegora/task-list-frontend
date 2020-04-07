import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsLayoutComponent } from './layouts/statistics-layout/statistics-layout.component';

import { StatisticsService } from './services/statistics.service';

@NgModule({
  declarations: [StatisticsLayoutComponent],
  imports: [CommonModule, StatisticsRoutingModule],
  providers: [StatisticsService],
})
export class StatisticsModule {}
