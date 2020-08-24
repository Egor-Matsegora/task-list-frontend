import { GetUserEffects, LoginEffects, RegistrationEffects, ChangeUserEffects } from './effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './reducers/auth.reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([LoginEffects, GetUserEffects, RegistrationEffects, ChangeUserEffects]),
  ],
})
export class AuthStoreModule {}
