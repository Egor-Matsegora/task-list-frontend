import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { statisticsReducer } from './reducers/statistics.reducer';
import { StatisticsEffects } from './effects/statistics.effect';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('statistics', statisticsReducer),
    EffectsModule.forFeature([StatisticsEffects]),
  ],
})
export class StatisticsStoreModule {}
