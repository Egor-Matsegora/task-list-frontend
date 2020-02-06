import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogoComponent } from './components/logo/logo.component';
import { MutatedPasswordInputDirective } from '../../directives/mutated-password-input.directive';

@NgModule({
  declarations: [HeaderComponent, LogoComponent, MutatedPasswordInputDirective],
  imports: [CommonModule, BrowserAnimationsModule, RouterModule],
  exports: [BrowserAnimationsModule, RouterModule, HeaderComponent, LogoComponent, MutatedPasswordInputDirective]
})
export class SharedModule {}
