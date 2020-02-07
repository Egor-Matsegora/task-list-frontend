import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogoComponent } from './components/logo/logo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MutatedPasswordInputDirective } from '../../directives/mutated-password-input.directive';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [HeaderComponent, LogoComponent, MutatedPasswordInputDirective, LoaderComponent],
  imports: [CommonModule, BrowserAnimationsModule, RouterModule, FormsModule, ReactiveFormsModule],
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
