import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// external modules
import { ToastrModule } from 'ngx-toastr';
import { NgxSmartModalModule } from 'ngx-smart-modal';
// internal modules
import { UiKitModule } from './ui-kit/ui-kit.module';
// components
import { StartPageComponent } from './components/start-page/start-page.component';
// directives
import { MutatedPasswordInputDirective } from '@app/directives/mutated-password-input.directive';
// helpers
import { ToastrOptions } from '@helpers/toastr-options';

@NgModule({
  declarations: [StartPageComponent, MutatedPasswordInputDirective],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastrModule.forRoot(ToastrOptions),
    NgxSmartModalModule.forRoot(),
    UiKitModule
  ],
  exports: [
    RouterModule,
    ToastrModule,
    MutatedPasswordInputDirective,
    FormsModule,
    ReactiveFormsModule,
    NgxSmartModalModule,
    UiKitModule
  ]
})
export class SharedModule {}
