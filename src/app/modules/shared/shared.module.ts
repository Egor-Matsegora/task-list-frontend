import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MutatedPasswordInputDirective } from '../../directives/mutated-password-input.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { LogoComponent } from './components/logo/logo.component';
import { HeaderComponent } from './components/header/header.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { AsideNavComponent } from './components/aside-nav/aside-nav.component';

@NgModule({
  declarations: [HeaderComponent, LogoComponent, MutatedPasswordInputDirective, LoaderComponent, StartPageComponent, AsideNavComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [
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
