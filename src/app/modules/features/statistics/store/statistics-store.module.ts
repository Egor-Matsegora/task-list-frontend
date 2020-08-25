import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { statisticsReducer } from './reducers';
import { StatisticsEffects } from './effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('statistics', statisticsReducer),
    EffectsModule.forFeature([StatisticsEffects]),
  ],
})
export class StatisticsStoreModule {}
