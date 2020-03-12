import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// external modules
import { ToastrModule } from 'ngx-toastr';
import { NgxSmartModalModule } from 'ngx-smart-modal';
// components
import { LoaderComponent } from './components/loader/loader.component';
import { LogoComponent } from './components/logo/logo.component';
import { StartPageComponent } from './components/start-page/start-page.component';
// directives
import { MutatedPasswordInputDirective } from '../../directives/mutated-password-input.directive';
// helpers
import { ToastrOptions } from '../../helpers/toastr-options';

@NgModule({
  declarations: [LogoComponent, LoaderComponent, StartPageComponent, MutatedPasswordInputDirective],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastrModule.forRoot(ToastrOptions),
    NgxSmartModalModule.forRoot()
  ],
  exports: [
    RouterModule,
    ToastrModule,
    LogoComponent,
    MutatedPasswordInputDirective,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
    NgxSmartModalModule
  ]
})
export class SharedModule {}
