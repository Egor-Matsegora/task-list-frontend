import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { authReducer } from './reducers/auth.reducers';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('auth', authReducer), EffectsModule.forFeature([AuthEffects])],
})
export class AuthStoreModule {}
