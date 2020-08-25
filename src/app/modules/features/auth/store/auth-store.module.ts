import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GetUserEffects, LoginEffects, RegistrationEffects, ChangeUserEffects } from './effects';
import { authReducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([LoginEffects, GetUserEffects, RegistrationEffects, ChangeUserEffects]),
  ],
})
export class AuthStoreModule {}
