import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MutatedPasswordInputDirective } from '../../directives/mutated-password-input.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { LogoComponent } from './components/logo/logo.component';
import { HeaderComponent } from './components/header/header.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { SystemComponent } from './components/system/system.component';

@NgModule({
  declarations: [HeaderComponent, LogoComponent, MutatedPasswordInputDirective, LoaderComponent, StartPageComponent, SystemComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BrowserAnimationsModule,
    RouterModule,
    HeaderComponent,
    LogoComponent,
    MutatedPasswordInputDirective,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent
  ]
})
export class SharedModule {}
